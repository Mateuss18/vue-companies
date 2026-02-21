<template>
  <div class="companies-list flex justify-center gap-20 flex-wrap">
    <CompanyCard v-for="company in dataCompanies.companies" :key="company.id" :company="company" />
  </div>
</template>

<script setup lang="ts">
import dataCompanies from '../../data/companies.json'
</script>
