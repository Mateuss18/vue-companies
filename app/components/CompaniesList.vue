<template>
  <div class="companies-list flex flex-col">
    <div
      class="flex justify-center gap-6 flex-wrap mt-4 mb-8 lg:grid-cols-3 lg:grid lg:gap-10 xxl:gap-12"
    >
      <CompanyCard v-for="company in visibleCompanies" :key="company.id" :company="company" />
    </div>

    <UButton
      v-if="visibleCount < companies.length"
      @click="loadMore"
      class="m-auto cursor-pointer"
      trailing-icon="i-lucide-plus"
    >
      Carregar mais
    </UButton>
  </div>
</template>

<script setup lang="ts">
import dataCompanies from '../../data/companies.json'

const companies = dataCompanies.companies

const step = 15
const visibleCount = ref(step)

const visibleCompanies = computed(() => companies.slice(0, visibleCount.value))

const loadMore = () => {
  visibleCount.value = Math.min(visibleCount.value + step, companies.length)
}
</script>
