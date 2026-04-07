<template>
  <div class="mt-6 flex flex-wrap gap-10 md:flex-row md:gap-5">
    <div class="xxl:w-[48%] flex flex-col gap-3 rounded-lg p-4 ring-1 ring-gray">
      <p>Tags</p>

      <div class="flex flex-wrap gap-3">
        <FiltersBaseOptionButton
          v-for="tag in tagOptions"
          :key="tag"
          :label="tag"
          :selected="selectedTags.includes(tag)"
          @click="handleTagClick(tag)"
        />
      </div>
    </div>

    <div class="xxl:w-[48%] flex flex-col gap-3 rounded-lg p-4 ring-1 ring-gray">
      <p>{{ t('common.workModel') }}</p>

      <div class="flex flex-wrap gap-3">
        <FiltersBaseOptionButton
          v-for="workModel in workModelOptions"
          :key="workModel"
          :label="getWorkModelLabel(workModel)"
          :selected="selectedWorkModels.includes(workModel)"
          @click="handleWorkModelClick(workModel)"
        />
      </div>
    </div>

    <div class="xxl:w-[48%] flex flex-col gap-3 rounded-lg p-4 ring-1 ring-gray">
      <p>{{ t('common.companySize') }}</p>

      <div class="flex flex-wrap gap-3">
        <FiltersBaseOptionButton
          v-for="companySize in companySizeOptions"
          :key="companySize"
          :label="getCompanySizeLabel(companySize)"
          :selected="selectedCompanySizes.includes(companySize)"
          @click="handlecompanySizeClick(companySize)"
        />
      </div>
    </div>

    <div class="xxl:w-[48%] flex flex-col gap-3 rounded-lg p-4 ring-1 ring-gray">
      <p>País</p>

      <div class="flex flex-wrap gap-3">
        <USelectMenu
          v-model="selectedCountry"
          :items="countryOptions"
          :ui="countrySelectMenuUi"
          :search-input="countrySearchInput"
          label-key="name"
          value-key="value"
          color="neutral"
          size="lg"
          class="w-full"
          placeholder="Selecione um país"
          clear
          clear-icon="i-lucide-x"
        >
          <template #default>
            <div v-if="selectedCountryOption" class="flex min-w-0 items-center gap-2">
              <span
                v-if="selectedCountryOption.code && selectedCountryOption.code !== 'global'"
                :class="`fi fi-${selectedCountryOption.code}`"
              />
              <UIcon v-else name="i-lucide-globe" class="size-4 text-subtitle" />
              <span class="truncate text-white">{{ selectedCountryOption.name }}</span>
            </div>
            <span v-else class="truncate text-subtitle">Selecione um país</span>
          </template>

          <template #item="{ item }">
            <div class="flex w-full items-center gap-2">
              <span v-if="item?.code && item.code !== 'global'" :class="`fi fi-${item.code}`" />
              <UIcon v-else name="i-lucide-globe" class="size-4 text-subtitle" />
              <span class="truncate">{{ item?.name }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { getWorkModelLabel, getCompanySizeLabel } = useCompanyLabels()

const {
  tagOptions,
  toggleTag,
  selectedTags,

  workModelOptions,
  toggleWorkModel,
  selectedWorkModels,

  companySizeOptions,
  selectedCompanySizes,
  toggleCompanySize,

  selectedCountry,
} = useCompanyQuery()
const { countryOptions } = useFilteredCompanies()

const { gtag } = useGtag()

const selectedCountryOption = computed(() => {
  return countryOptions.value.find((country) => country.value === selectedCountry.value)
})

const countrySelectMenuUi = {
  base: 'w-full pl-4 rounded-3xl border border-gray-500 bg-transparent text-white hover:bg-gray-50/5 data-[state=open]:bg-gray-50/5 cursor-pointer',
  value: 'text-white',
  placeholder: 'text-subtitle',
  trailing: 'pe-3',
  trailingIcon: 'size-4 text-subtitle',
  content: 'rounded-2xl border border-gray bg-bg-secondary shadow-xl ring-0',
  focusScope: 'bg-bg-secondary',
  viewport: 'max-h-72 p-1.5',
  group: 'p-0',
  input: 'border-b border-gray px-2 pb-2',
  empty: 'px-3 py-3 text-sm text-subtitle',
  item: 'rounded-xl px-3 py-3 text-white data-highlighted:not-data-disabled:text-white data-highlighted:not-data-disabled:before:bg-gray-50/10 data-[state=checked]:text-primary cursor-pointer',
  itemLabel: 'text-sm',
  itemTrailingIcon: 'text-primary',
} as const

const countrySearchInput = {
  placeholder: 'Buscar país...',
  variant: 'none',
  icon: 'i-lucide-search',
  ui: {
    root: 'w-full px-1.5 pt-1.5',
    base: 'h-10 rounded-xl bg-bg text-sm text-white placeholder:text-subtitle',
    leading: 'ps-5',
    leadingIcon: 'size-4 text-subtitle',
  },
} as const

const handleTagClick = (tag: (typeof tagOptions)[number]) => {
  const wasSelected = selectedTags.value.includes(tag)

  toggleTag(tag)

  gtag('event', 'filter_toggle', {
    section: 'filters_panel',
    source: 'filters_panel',
    filter_type: 'tag',
    filter_value: tag,
    action: wasSelected ? 'deselect' : 'select',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: selectedTags.value.length + selectedWorkModels.value.length,
  })
}

const handleWorkModelClick = (workModel: (typeof workModelOptions)[number]) => {
  const wasSelected = selectedWorkModels.value.includes(workModel)

  toggleWorkModel(workModel)

  gtag('event', 'filter_toggle', {
    section: 'filters_panel',
    source: 'filters_panel',
    filter_type: 'work_model',
    filter_value: workModel,
    action: wasSelected ? 'deselect' : 'select',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: selectedTags.value.length + selectedWorkModels.value.length,
  })
}

const handlecompanySizeClick = (companySize: (typeof companySizeOptions)[number]) => {
  const wasSelected = selectedCompanySizes.value.includes(companySize)

  toggleCompanySize(companySize)

  gtag('event', 'filter_toggle', {
    section: 'filters_panel',
    source: 'filters_panel',
    filter_type: 'company_size',
    filter_value: companySize,
    action: wasSelected ? 'deselect' : 'select',
    selected_tags_count: selectedTags.value.length,
    selected_work_models_count: selectedWorkModels.value.length,
    total_selected_filters: selectedTags.value.length + selectedWorkModels.value.length,
  })
}
</script>
