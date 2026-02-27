<template>
  <div class="home min-h-screen text-tex flex flex-col justify-center px-4 md:px-12 xxl:px-34">
    <!-- 26 -->
    <HeroSection @scrollToList="scrollToList" />
    <section ref="companiesCardsListRef">
      <CompaniesList />
    </section>
    <FooterSimple />
  </div>
</template>

<script setup lang="ts">
const companiesCardsListRef = ref<HTMLElement | null>(null)

const scrollToList = () => {
  companiesCardsListRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
