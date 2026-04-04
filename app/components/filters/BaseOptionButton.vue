<template>
  <UButton
    color="primary"
    :variant="selected ? 'solid' : 'outline'"
    class="rounded-3xl py-2 px-4 outline-0 ring-0 border cursor-pointer capitalize"
    :class="
      selected
        ? 'text-primary bg-primary/5 border-primary hover:bg-secondary/5 hover:text-secondary hover:border-secondary active:bg-secondary/5'
        : 'text-white border-gray-500 hover:bg-gray-50/5 active:bg-gray-50/5'
    "
  >
    {{ label }}
  </UButton>
</template>

<script setup lang="ts">
interface Props {
  label: string
  selected?: boolean
}

defineProps<Props>()
</script>
