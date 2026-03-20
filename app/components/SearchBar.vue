<template>
  <UInput
    icon="i-lucide-search"
    placeholder="Buscar empresas.."
    v-model="modelValue"
    :ui="{ base: 'h-13 text-lg pl-10 bg-bg-secondary' }"
    class="flex w-full"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })
</script>
