<template>
  <UInput
    icon="i-lucide-search"
    placeholder="Buscar empresas.."
    v-model="value"
    :ui="{ base: 'h-14 text-lg pl-10' }"
    class="mt-7 mx-auto w-full md:w-[600px] lg:w-[670px]"
  />
</template>

<script setup lang="ts">
const value = ref('')
</script>
