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
            @click="toggleWorkModel(selectedWorkModel)"
          >
            {{ selectedWorkModel }}
          </UButton>

          <UButton
            v-for="selectedTag in selectedTags"
            :key="selectedTag"
            class="text-xs cursor-pointer bg-transparent border border-primary text-primary rounded-full hover:bg-secondary/5 hover:text-secondary hover:border-secondary active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="toggleTag(selectedTag)"
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

const totalFiltersSelected = computed(() => {
  return selectedTags.value.length + selectedWorkModels.value.length
})

const activeFilters = computed(() => {
  return [...selectedTags.value, ...selectedWorkModels.value]
})

const openPanel = ref(false)

const openPanelFilters = () => {
  openPanel.value = !openPanel.value
}
</script>

<style scoped>
.circle {
  font-variant-numeric: tabular-nums;
  padding: 3px 7px;
}
</style>
