<template>
  <div class="flex gap-10 mt-6 flex-wrap md:flex-row md:gap-5">
    <div class="flex flex-col gap-2 xxl:w-[48%]">
      <p>Tags</p>

      <div class="flex gap-3 flex-wrap">
        <UButton
          v-for="tag in tagOptions"
          :key="tag"
          @click="handleTagClick(tag)"
          color="primary"
          :variant="selectedTags.includes(tag) ? 'solid' : 'outline'"
          class="rounded-3xl py-3 px-5 outline-0 ring-0 border cursor-pointer"
          :class="
            selectedTags.includes(tag)
              ? 'text-primary bg-primary/5 border-primary hover:bg-secondary/5 hover:text-secondary hover:border-secondary active:bg-secondary/5'
              : 'text-white border-gray-500 hover:bg-gray-50/5 active:bg-gray-50/5'
          "
        >
          {{ tag }}
        </UButton>
      </div>
    </div>

    <div class="flex flex-col gap-2 xxl:w-[48%]">
      <p>Modelo de trabalho</p>

      <div class="flex gap-3 flex-wrap">
        <UButton
          v-for="workModel in workModelOptions"
          :key="workModel"
          @click="handleWorkModelClick(workModel)"
          color="primary"
          :variant="selectedWorkModels.includes(workModel) ? 'solid' : 'outline'"
          class="rounded-3xl py-3 px-5 outline-0 ring-0 border cursor-pointer"
          :class="
            selectedWorkModels.includes(workModel)
              ? 'text-primary bg-primary/5 border-primary hover:bg-secondary/5 hover:text-secondary hover:border-secondary active:bg-secondary/5'
              : 'text-white border-gray-500 hover:bg-gray-50/5 active:bg-gray-50/5'
          "
        >
          {{ workModel }}
        </UButton>
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
</script>
