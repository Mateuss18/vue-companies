<template>
  <div class="flex gap-10 mt-6">
    <div class="flex flex-col gap-2 w-[50%]">
      <p>Tags</p>

      <div class="flex gap-3 flex-wrap">
        <UButton
          v-for="tag in tagOptions"
          :key="tag"
          @click="toggleTag(tag)"
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

    <div class="flex flex-col gap-2 w-[50%]">
      <p>Modelo de trabalho</p>

      <div class="flex gap-3 flex-wrap">
        <UButton
          v-for="workModel in workModelOptions"
          :key="workModel"
          @click="toggleWorkModel(workModel)"
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
</script>
