<template>
  <UInput
    icon="i-lucide-search"
    :placeholder="t('common.searchCompanies')"
    v-model="modelValue"
    :ui="{
      base: 'h-13 text-lg pl-10 bg-bg-secondary border border-gray-500 placeholder:text-gray-400',
    }"
    class="flex w-full"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const modelValue = defineModel<string>({ default: '' })
</script>
