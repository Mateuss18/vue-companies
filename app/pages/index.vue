<template>
  <div class="home min-h-screen text-text flex flex-col justify-center px-4 md:px-12 xxl:px-26">
    <LayoutHeroSection @scrollToList="scrollToList" />

    <section ref="companiesCardsListRef">
      <FiltersSearchFiltersBar />

      <div class="mt-12 flex flex-col gap-8 xl:flex-row xl:items-start">
        <FiltersPanel />

        <div class="min-w-0 flex-1 min-h-full">
          <CompanyCompaniesList @scrollToList="scrollToList" />
        </div>
      </div>
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
