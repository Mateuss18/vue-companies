<template>
  <div class="companies-list flex flex-col">
    <p class="text-center text-md my-7">
      Mais de {{ estimatedCompaniesAdded }} empresas catalogadas e crescendo!
    </p>

    <div class="min-h-[700px]">
      <div
        v-if="visibleCompanies.length > 0"
        class="flex justify-center gap-6 flex-wrap mb-8 lg:grid-cols-3 lg:grid lg:gap-10 xxl:gap-12"
      >
        <CompanyCard
          v-for="company in visibleCompanies"
          :key="company.id"
          :directory-item="company"
        />
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
      v-if="visibleCount < filteredCompanies.length"
      @click="loadMore"
      class="m-auto cursor-pointer bg-primary text-bg hover:bg-primary-dark p-4"
      trailing-icon="i-lucide-plus"
    >
      Carregar mais
    </UButton>
  </div>
</template>

<script setup lang="ts">
const { search, selectedTags, selectedWorkModels } = useCompanyQuery()
const { estimatedCompaniesAdded } = useCompanies()
const {
  filteredCompanies,
  pageSize,
  visibleCount,
  visibleCompanies,
  resetVisibleCount,
  loadMore: loadMoreShared,
} = useFilteredCompanies()

const emit = defineEmits<{ (e: 'scrollToList'): void }>()

watch(
  () => [search.value, selectedTags.value, selectedWorkModels.value],
  () => {
    const hasAnyFilter =
      search.value !== '' ||
      selectedTags.value.length !== 0 ||
      selectedWorkModels.value.length !== 0

    resetVisibleCount()

    if (hasAnyFilter) {
      emit('scrollToList')
    }
  },
)

const { gtag } = useGtag()

const loadMore = () => {
  const previousCount = visibleCount.value
  const loadMoreClickIndex = Math.ceil(previousCount / pageSize)

  loadMoreShared()

  gtag('event', 'load_more_companies', {
    section: 'companies_list',
    item_list_id: 'companies_list',
    item_list_name: 'Companies List',
    load_more_click_index: loadMoreClickIndex,
    items_before: previousCount,
    items_shown: visibleCount.value,
    items_added: visibleCount.value - previousCount,
    items_total: filteredCompanies.value.length,
  })
}
</script>
