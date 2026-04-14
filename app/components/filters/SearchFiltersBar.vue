<template>
  <div
    class="mt-6 rounded-xl border-2 border-gray bg-bg-secondary lg:pt-5! p-4 lg:mx-40 lg:p-6 xxl:mx-50"
  >
    <p class="text-center text-md mb-4">
      {{ t('companies.catalogMessage', { count: estimatedCompaniesAdded }) }}
    </p>

    <FiltersSearchBar v-model="search" />

    <div
      class="mt-4 flex flex-col gap-4 text-xs lg:flex-row lg:items-start"
      :class="hasSelectedFilters ? 'lg:justify-between' : 'lg:justify-end'"
    >
      <div v-if="hasSelectedFilters" class="flex flex-wrap items-center gap-2 max-w-[78%]">
        <p class="text-subtitle">{{ t('common.active') }}</p>

        <div class="flex flex-wrap gap-3">
          <UButton
            v-if="selectedCompanyType !== 'all'"
            class="cursor-pointer rounded-full border border-primary bg-transparent text-xs text-primary hover:border-red-800 hover:bg-red-900/5 hover:text-red-800 active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleCompanyTypeChipClick"
          >
            {{ companyTypeLabel }}
          </UButton>

          <UButton
            v-if="selectedCountry"
            class="cursor-pointer rounded-full border border-primary bg-transparent text-xs text-primary hover:border-red-800 hover:bg-red-900/5 hover:text-red-800 active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleCountryChipClick"
          >
            {{ selectedCountryLabel }}
          </UButton>

          <UButton
            v-for="selectedWorkModel in selectedWorkModels"
            :key="selectedWorkModel"
            class="cursor-pointer rounded-full border border-primary bg-transparent text-xs text-primary hover:border-red-800 hover:bg-red-900/5 hover:text-red-800 active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleWorkModelChipClick(selectedWorkModel)"
          >
            {{ getWorkModelLabel(selectedWorkModel) }}
          </UButton>

          <UButton
            v-for="selectedTag in selectedTags"
            :key="selectedTag"
            class="cursor-pointer rounded-full border border-primary bg-transparent text-xs text-primary capitalize hover:border-red-800 hover:bg-red-900/5 hover:text-red-800 active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleTagChipClick(selectedTag)"
          >
            {{ selectedTag }}
          </UButton>

          <UButton
            v-for="selectedCompanySize in selectedCompanySizes"
            :key="selectedCompanySize"
            class="cursor-pointer rounded-full border border-primary bg-transparent text-xs text-primary hover:border-red-800 hover:bg-red-900/5 hover:text-red-800 active:bg-secondary/5"
            trailing-icon="i-lucide-x"
            size="sm"
            @click="handleCompanySizeChipClick(selectedCompanySize)"
          >
            {{ getCompanySizeLabel(selectedCompanySize) }}
          </UButton>
        </div>
      </div>

      <div class="flex items-center text-subtitle text-sm">
        {{
          t('companies.showingResults', { visible: visibleCompanies.length, total: resultsCount })
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { getCountryLabel } = useCountry()
const { getCompanySizeLabel, getWorkModelLabel } = useCompanyLabels()

const {
  search,
  selectedTags,
  toggleTag,
  selectedWorkModels,
  toggleWorkModel,
  selectedCompanySizes,
  toggleCompanySize,
  selectedCountry,
  selectedCompanyType,
} = useCompanyQuery()
const { estimatedCompaniesAdded } = useCompanies()
const { visibleCompanies, resultsCount } = useFilteredCompanies()
const { gtag } = useGtag()

const selectedCountryLabel = computed(() => {
  return selectedCountry.value ? getCountryLabel(selectedCountry.value) : ''
})

const companyTypeLabel = computed(() => {
  switch (selectedCompanyType.value) {
    case 'company':
      return t('common.companies')
    case 'consultancy':
      return t('common.consultancies')
    default:
      return ''
  }
})

const totalFiltersSelected = computed(() => {
  return (
    selectedTags.value.length +
    selectedWorkModels.value.length +
    selectedCompanySizes.value.length +
    (selectedCountry.value ? 1 : 0) +
    (selectedCompanyType.value === 'all' ? 0 : 1)
  )
})

const hasSelectedFilters = computed(() => totalFiltersSelected.value > 0)

const handleWorkModelChipClick = (workModel: (typeof selectedWorkModels.value)[number]) => {
  toggleWorkModel(workModel)

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'work_model',
    filter_value: workModel,
    action: 'deselect',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}

const handleTagChipClick = (tag: (typeof selectedTags.value)[number]) => {
  toggleTag(tag)

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'tag',
    filter_value: tag,
    action: 'deselect',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}

const handleCompanySizeChipClick = (companySize: (typeof selectedCompanySizes.value)[number]) => {
  toggleCompanySize(companySize)

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'company_size',
    filter_value: companySize,
    action: 'deselect',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}

const handleCountryChipClick = () => {
  const previousCountry = selectedCountry.value
  if (!previousCountry) return

  selectedCountry.value = undefined

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'country',
    filter_value: previousCountry,
    action: 'deselect',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}

const handleCompanyTypeChipClick = () => {
  const previousCompanyType = selectedCompanyType.value
  selectedCompanyType.value = 'all'

  gtag('event', 'filter_toggle', {
    section: 'search_filters_bar',
    source: 'active_chip',
    filter_type: 'company_type',
    filter_value: previousCompanyType,
    action: 'deselect',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: totalFiltersSelected.value,
  })
}
</script>
