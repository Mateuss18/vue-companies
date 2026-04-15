<template>
  <div class="min-h-screen flex items-center justify-center text-text px-6">
    <div class="text-center flex flex-col items-center gap-4">
      <p class="text-sm uppercase tracking-[0.3em] text-subtitle">{{ t('error.title') }}</p>
      <h1 class="text-5xl font-semibold">404</h1>
      <p class="text-base text-subtitle">{{ t('error.notFound') }}</p>
      <UButton to="/" class="mt-2 px-6" color="primary" variant="solid">
        {{ t('error.backHome') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
