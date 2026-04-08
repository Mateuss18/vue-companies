<template>
  <div class="hero-section flex justify-center flex-col items-center py-12 sm:py-22 lg:py-34">
    <ButtonChangeLang />

    <IconsLogo
      class="mb-4 w-[250px] h-[68px] sm:w-[300px] sm:h-auto sm:mb-5 md:w-[350px] lg:w-[370px]"
    />

    <h1 class="font-light text-xl mb-4 text-center sm:text-3xl md:text-4xl lg:text-4xl">
      {{ t('hero.title') }}
    </h1>

    <p
      class="font-light text-md mb-4 text-center color-(--color-subtitle) sm:mb-7 md:text-lg md:w-xl lg:text-2xl"
    >
      {{ t('hero.description') }}
    </p>

    <UButton
      class="p-3 text-md gap-2 cursor-pointer bg-primary text-bg hover:bg-primary-dark md:p-4"
      @click="handleExploreClick"
    >
      {{ t('hero.cta') }}
      <PhArrowFatLinesDown :size="22" weight="fill" />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import { PhArrowFatLinesDown } from '@phosphor-icons/vue'

const emit = defineEmits<{ (e: 'scrollToList'): void }>()

const { t } = useI18n()
const { gtag } = useGtag()

const handleExploreClick = () => {
  gtag('event', 'explore_companies_click', {
    section: 'hero',
    target: 'companies_list',
  })
  emit('scrollToList')
}
</script>
