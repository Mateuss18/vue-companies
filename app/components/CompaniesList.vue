<template>
  <div class="companies-list flex flex-col">
    <p class="text-center text-md my-7">
      Mais de {{ addedCompanies }} empresas catalogadas e crescendo!
    </p>

    <div class="min-h-[700px]">
      <div
        v-if="visibleCompanies.length > 0"
        class="flex justify-center gap-6 flex-wrap mb-8 lg:grid-cols-3 lg:grid lg:gap-10 xxl:gap-12"
      >
        <CompanyCard v-for="company in visibleCompanies" :key="company.id" :company="company" />
      </div>
      <div
        v-else
        class="flex justify-center items-center flex-col mt-20 text-center text-lg sm:text-md"
      >
        <UIcon name="i-lucide-search-x" class="mb-4 size-8" />
        Infelizmente nenhum resultado foi encontrado
      </div>
    </div>

    <UButton
      v-if="props.searchValue === '' && visibleCount < companies.length"
      @click="loadMore"
      class="m-auto cursor-pointer bg-primary text-bg hover:bg-primary-dark"
      trailing-icon="i-lucide-plus"
    >
      Carregar mais
    </UButton>
  </div>
</template>

<script setup lang="ts">
import dataCompanies from '../../data/companies.json'

const props = defineProps<{ searchValue: string }>()

const emit = defineEmits<{ (e: 'scrollToList'): void }>()

const companies = dataCompanies.companies

const filteredList = computed(() =>
  companies.filter((company) =>
    company.name.toLocaleLowerCase().includes(props.searchValue.trim().toLocaleLowerCase()),
  ),
)

const step = 15
const visibleCount = ref(step)
const visibleCompanies = computed(() => filteredList.value.slice(0, visibleCount.value))
const addedCompanies = Math.floor(companies.length / 10) * 10

watch(
  () => props.searchValue,
  () => {
    if (props.searchValue !== '') {
      emit('scrollToList')
    }
  },
)

const { gtag } = useGtag()
const loadMore = () => {
  const previousCount = visibleCount.value
  const nextCount = Math.min(visibleCount.value + step, companies.length)
  const loadMoreClickIndex = Math.ceil(previousCount / step)
  visibleCount.value = nextCount
  gtag('event', 'load_more_companies', {
    section: 'companies_list',
    item_list_id: 'companies_list',
    item_list_name: 'Companies List',
    load_more_click_index: loadMoreClickIndex,
    items_before: previousCount,
    items_shown: visibleCount.value,
    items_added: visibleCount.value - previousCount,
    items_total: companies.length,
  })
}
</script>
