<template>
  <aside
    class="flex w-full flex-col gap-8 rounded-md border-2 border-gray bg-bg-secondary p-5 xl:w-[320px] xl:min-w-[320px]"
  >
    <div class="flex flex-col gap-3">
      <p>{{ t('common.types') }}</p>

      <div class="flex flex-col gap-2">
        <URadioGroup
          v-model="selectedCompanyType"
          :items="companyTypeItems"
          variant="card"
          indicator="hidden"
          orientation="horizontal"
          :ui="{
            fieldset: 'flex gap-2 flex-wrap',
            item: 'text-sm rounded-lg border border-gray-500 bg-bg-secondary transition-colors cursor-pointer flex items-center justify-center px-3.5 py-2 hover:bg-gray-50/5 active:bg-gray-50/5',
            wrapper: 'w-full',
            label: 'w-full',
          }"
        />
        <p class="text-xs text-subtitle">{{ t('common.consultancyFiltersNotice') }}</p>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p>{{ t('common.country') }}</p>

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
          class="w-full ring-0!"
          :placeholder="t('common.selectCountry')"
          clear
          clear-icon="i-lucide-x"
        >
          <template #default>
            <div v-if="selectedCountryOption" class="flex min-w-0 items-center gap-2">
              <span
                v-if="
                  selectedCountryOption.code &&
                  selectedCountryOption.code.toLocaleLowerCase() !== 'global'
                "
                :class="`fi fi-${selectedCountryOption.code}`"
              />
              <span v-else class="size-4 flex items-center justify-center text-subtitle">🌎</span>
              <span class="truncate text-white capitalize">{{ selectedCountryOption.name }}</span>
            </div>
            <span v-else class="truncate text-subtitle font-medium">
              {{ t('common.selectCountry') }}
            </span>
          </template>

          <template #item="{ item }">
            <div class="flex w-full items-center gap-2">
              <span
                v-if="item?.code && item.code.toLocaleLowerCase() !== 'global'"
                :class="`fi fi-${item.code}`"
              />
              <span v-else class="size-4 flex items-center justify-center text-subtitle">🌎</span>
              <span class="truncate capitalize">{{ item?.name }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p>{{ t('common.tags') }}</p>

      <div
        class="flex flex-wrap gap-2"
        :class="selectedCompanyType === 'consultancy' ? 'pointer-events-none opacity-50' : ''"
      >
        <FiltersBaseOptionButton
          v-for="tag in tagOptions"
          :key="tag"
          :label="tag"
          :selected="selectedTags.includes(tag)"
          :disabled="selectedCompanyType === 'consultancy'"
          @click="handleTagClick(tag)"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p>{{ t('common.workModel') }}</p>

      <div
        class="flex flex-wrap gap-2"
        :class="selectedCompanyType === 'consultancy' ? 'pointer-events-none opacity-50' : ''"
      >
        <FiltersBaseOptionButton
          v-for="workModel in workModelOptions"
          :key="workModel"
          :label="getWorkModelLabel(workModel)"
          :selected="selectedWorkModels.includes(workModel)"
          :disabled="selectedCompanyType === 'consultancy'"
          @click="handleWorkModelClick(workModel)"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <p>{{ t('common.size') }}</p>

      <div class="flex flex-wrap gap-2">
        <FiltersBaseOptionButton
          v-for="companySize in companySizeOptions"
          :key="companySize"
          :label="getCompanySizeLabel(companySize)"
          :selected="selectedCompanySizes.includes(companySize)"
          @click="handlecompanySizeClick(companySize)"
        />
      </div>
    </div>

    <UButton
      class="h-10 w-full justify-center text-center text-white!"
      :class="!canClearFilters ? 'opacity-60!' : 'cursor-pointer'"
      color="error"
      variant="solid"
      :disabled="!canClearFilters"
      @click="clear"
      icon="i-lucide-trash"
    >
      {{ t('common.clear') }}
    </UButton>
  </aside>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { getWorkModelLabel, getCompanySizeLabel } = useCompanyLabels()

const companyTypeItems = computed(() => [
  { value: 'all', label: t('common.all') },
  { value: 'company', label: t('common.companies') },
  { value: 'consultancy', label: t('common.consultancies') },
])

const {
  search,
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
  selectedCompanyType,
  clear,
} = useCompanyQuery()
const { countryOptions } = useFilteredCompanies()

const { gtag } = useGtag()

const canClearFilters = computed(() => {
  return (
    search.value.trim() !== '' ||
    selectedTags.value.length > 0 ||
    selectedWorkModels.value.length > 0 ||
    selectedCompanySizes.value.length > 0 ||
    !!selectedCountry.value ||
    selectedCompanyType.value !== 'all'
  )
})

const selectedCountryOption = computed(() => {
  return countryOptions.value.find((country) => country.value === selectedCountry.value)
})

const countrySelectMenuUi = {
  base: 'w-full pl-4 rounded-3xl border border-gray-500 bg-transparent text-white hover:bg-gray-50/5 data-[state=open]:bg-gray-50/5 cursor-pointer',
  value: 'text-white',
  placeholder: 'text-subtitle',
  trailing: 'pe-3',
  trailingIcon: 'size-4 text-subtitle',
  content: 'rounded-2xl border border-gray bg-bg-secondary shadow-xl ring-0!',
  focusScope: 'bg-bg-secondary',
  viewport: 'max-h-72 p-1.5',
  group: 'p-0',
  input: 'border-b border-gray px-2 pb-2',
  empty: 'px-3 py-3 text-sm text-subtitle ring-0!',
  item: 'rounded-xl px-3 py-3 text-white data-highlighted:not-data-disabled:text-white data-highlighted:not-data-disabled:before:bg-gray-50/10 data-[state=checked]:text-primary cursor-pointer ring-0!',
  itemLabel: 'text-sm',
  itemTrailingIcon: 'text-primary',
} as const

const countrySearchInput = computed(() => ({
  placeholder: t('common.searchCountry'),
  variant: 'none',
  icon: 'i-lucide-search',
  ui: {
    root: 'w-full px-1.5 pt-1.5',
    base: 'h-10 rounded-xl bg-bg text-sm text-white placeholder:text-subtitle',
    leading: 'ps-5',
    leadingIcon: 'size-4 text-subtitle',
  },
}))

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
