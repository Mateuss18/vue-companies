<template>
  <div class="home min-h-screen text-text flex flex-col justify-center px-4 md:px-12 xxl:px-34">
    <HeroSection @scrollToList="scrollToList" />

    <section ref="companiesCardsListRef">
      <SearchBar v-model="searchValue" />

      <CompaniesList @scrollToList="scrollToList" :search-value="searchValue" />
    </section>

    <FooterSimple />
  </div>
</template>

<script setup lang="ts">
const companiesCardsListRef = ref<HTMLElement | null>(null)

const scrollToList = () => {
  companiesCardsListRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const searchValue = ref('')
</script>
