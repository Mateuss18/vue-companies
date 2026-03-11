<template>
  <UInput
    icon="i-lucide-search"
    placeholder="Buscar empresas.."
    v-model="modelValue"
    :ui="{ base: 'h-14 text-lg pl-10 bg-bg-secondary' }"
    class="flex mt-7 mx-auto w-full md:max-w-[600px] lg:w-[670px]"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })
</script>
