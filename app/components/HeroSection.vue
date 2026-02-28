<template>
  <div class="hero-section flex justify-center flex-col items-center py-12 sm:py-22 lg:w lg:py-34">
    <IconsLogo
      class="mb-4 w-[250px] h-[68px] sm:w-[300px] sm:h-auto sm:md-5 md:w-[350px] lg:w-[370px]"
    />

    <h1 class="font-light text-xl mb-4 text-center sm:text-3xl md:text-4xl lg:text-4xl">
      Trabalhe onde o Vue.js é valorizado
    </h1>

    <p
      class="font-light text-md mb-4 text-center color-(--color-subtitle) sm:mb-7 md:text-lg md:w-xl lg:text-2xl"
    >
      Descubra empresas brasileiras e internacionais que desenvolvem com Vue
    </p>

    <UButton class="p-3 text-md gap-2 cursor-pointer md:p-4" @click="emit('scrollToList')">
      Explorar empresas
      <PhArrowFatLinesDown :size="22" weight="fill" />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import { PhArrowFatLinesDown } from '@phosphor-icons/vue'

const emit = defineEmits<{ (e: 'scrollToList'): void }>()
</script>
