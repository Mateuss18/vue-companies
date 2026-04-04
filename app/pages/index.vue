<template>
  <div class="home min-h-screen text-text flex flex-col justify-center px-4 md:px-12 xxl:px-34">
    <LayoutHeroSection @scrollToList="scrollToList" />

    <section ref="companiesCardsListRef">
      <FiltersSearchFiltersBar />

      <CompanyCompaniesList @scrollToList="scrollToList" />
    </section>

    <LayoutFooterSimple />
  </div>
</template>

<script setup lang="ts">
const companiesCardsListRef = ref<HTMLElement | null>(null)

const scrollToList = () => {
  companiesCardsListRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
