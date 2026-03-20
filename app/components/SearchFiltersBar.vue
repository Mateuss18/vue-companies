<template>
  <div class="bg-bg-secondary rounded-2xl p-4 border-gray border-2 mt-6 lg:p-6 lg:mx-40 xxl:mx-50">
    <div class="flex gap-5 justify-between mb-6 flex-col md:flex-row">
      <SearchBar v-model="search" />

      <div class="flex gap-3">
        <UButton
          size="md"
          icon="i-lucide-sliders-horizontal"
          class="px-5 cursor-pointer"
          :class="openPanel ? 'bg-primary/5' : ''"
          variant="outline"
          @click="openPanelFilters"
        >
          Filtros
          <div
            v-if="totalFiltersSelected > 0"
            class="circle ml-1 border-primary border rounded-2xl bg-bg-secondary text-primary text-xs"
          >
            {{ totalFiltersSelected }}
          </div>
        </UButton>

        <UButton
          class="px-5 cursor-pointer h-12 mb:h-auto md:h-full"
          @click="clear"
          :disabled="activeFilters.length == 0"
          variant="outline"
          color="error"
        >
          Limpar
        </UButton>
      </div>
    </div>

    <div class="flex justify-between flex-wrap gap-5">
      <div class="flex items-center gap-2">
        <p class="text-xs">Ativos:</p>

        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="selectedWorkModel in selectedWorkModels"
            :key="selectedWorkModel"
            class="text-xs cursor-pointer bg-transparent border border-primary text-primary rounded-full hover:bg-secondary/5 hover:text-secondary hover:border-secondary active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleWorkModelChipClick(selectedWorkModel)"
          >
            {{ selectedWorkModel }}
          </UButton>

          <UButton
            v-for="selectedTag in selectedTags"
            :key="selectedTag"
            class="text-xs cursor-pointer bg-transparent border border-primary text-primary rounded-full hover:bg-secondary/5 hover:text-secondary hover:border-secondary active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleTagChipClick(selectedTag)"
          >
            {{ selectedTag }}
          </UButton>
        </div>
      </div>

      <div class="flex text-xs items-center">
        Exibindo {{ visibleCompanies.length }} empresas de {{ resultsCount }} encontradas
      </div>
    </div>

    <FiltersPanel v-show="openPanel" />
  </div>
</template>

<script setup lang="ts">
const { search, selectedTags, toggleTag, selectedWorkModels, toggleWorkModel, clear } =
  useCompanyQuery()
const { visibleCompanies, resultsCount } = useFilteredCompanies()
const { gtag } = useGtag()

const totalFiltersSelected = computed(() => {
  return selectedTags.value.length + selectedWorkModels.value.length
})

const activeFilters = computed(() => {
  return [...selectedTags.value, ...selectedWorkModels.value]
})

const openPanel = ref(false)

const openPanelFilters = () => {
  const nextOpen = !openPanel.value
  openPanel.value = nextOpen

  gtag('event', 'filters_panel_toggle', {
    section: 'search_filters_bar',
    action: nextOpen ? 'open' : 'close',
    is_open: nextOpen,
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}

const handleWorkModelChipClick = (workModel: (typeof selectedWorkModels.value)[number]) => {
  const wasSelected = selectedWorkModels.value.includes(workModel)

  toggleWorkModel(workModel)

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'work_model',
    filter_value: workModel,
    action: wasSelected ? 'deselect' : 'select',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}

const handleTagChipClick = (tag: (typeof selectedTags.value)[number]) => {
  const wasSelected = selectedTags.value.includes(tag)

  toggleTag(tag)

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'tag',
    filter_value: tag,
    action: wasSelected ? 'deselect' : 'select',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}
</script>

<style scoped>
.circle {
  font-variant-numeric: tabular-nums;
  padding: 3px 7px;
}
</style>
