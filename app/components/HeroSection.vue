<template>
  <div class="hero-section flex justify-center flex-col items-center py-24">
    <IconsLogo class="mb-6" />

    <h1 class="font-light text-5xl mb-4">Trabalhe onde o Vue.js é valorizado</h1>

    <p class="font-light text-2xl/9 mb-7 w-2xl text-center color-(--color-subtitle)">
      Descubra empresas brasileiras e internacionais que desenvolvem com Vue
    </p>

    <UButton class="p-5 text-lg gap-2">
      Explorar empresas
      <PhArrowFatLinesDown :size="22" weight="fill" />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import { PhArrowFatLinesDown } from '@phosphor-icons/vue'
</script>
