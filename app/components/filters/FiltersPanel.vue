<template>
  <div class="flex gap-10 mt-6 flex-wrap md:flex-row md:gap-5">
    <div class="flex flex-col gap-3 xxl:w-[48%] ring-1 rounded-lg ring-gray p-4">
      <p>Tags</p>

      <div class="flex gap-3 flex-wrap">
        <FiltersBaseOptionButton
          v-for="tag in tagOptions"
          :key="tag"
          @click="handleTagClick(tag)"
          :selected="selectedTags.includes(tag)"
          :label="tag"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3 xxl:w-[48%] ring-1 rounded-lg ring-gray p-4">
      <p>Modelo de trabalho</p>

      <div class="flex gap-3 flex-wrap">
        <FiltersBaseOptionButton
          v-for="workModel in workModelOptions"
          :key="workModel"
          @click="handleWorkModelClick(workModel)"
          :selected="selectedWorkModels.includes(workModel)"
          :label="workModel"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3 xxl:w-[48%] ring-1 rounded-lg ring-gray p-4">
      <p>Tamanho da empresa</p>

      <div class="flex gap-3 flex-wrap">
        <FiltersBaseOptionButton
          v-for="companySize in companySizeOptions"
          :key="companySize"
          @click="handlecompanySizeClick(companySize)"
          :selected="selectedCompanySizes.includes(companySize)"
          :label="companySize"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3 xxl:w-[48%] ring-1 rounded-lg ring-gray p-4">
      <p>País</p>

      <div class="flex gap-3 flex-wrap">
        <USelect />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
} = useCompanyQuery()

const { gtag } = useGtag()

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
