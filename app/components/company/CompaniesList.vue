<template>
  <div class="companies-list flex flex-col">
    <div v-if="visibleCompanies.length > 0">
      <TransitionGroup
        name="list"
        tag="div"
        class="flex justify-center gap-5 flex-wrap mb-8 lg:grid-cols-3 lg:grid lg:gap-10 xxl:gap-10"
      >
        <CompanyCard
          v-for="company in visibleCompanies"
          :key="company.id"
          :directory-item="company"
        />
      </TransitionGroup>
    </div>

    <div
      v-else
      class="flex justify-center items-center flex-col mt-20 text-center text-lg sm:text-md"
    >
      <UIcon name="i-lucide-search-x" class="mb-4 size-8" />
      {{ t('common.noResults') }}
    </div>

    <UButton
      v-if="visibleCount < filteredCompanies.length"
      @click="loadMore"
      class="m-auto cursor-pointer bg-primary text-bg hover:bg-primary-dark p-4 hover:scale-105 active:scale-95 duration-200 transition-transform"
      trailing-icon="i-lucide-plus"
    >
      {{ t('common.loadMore') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { search } = useCompanyQuery()
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
  () => search.value,
  () => {
    const hasAnyFilter = search.value !== '' || resetVisibleCount()

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

<style scoped>
.list-enter-active {
  transition: all 0.3s ease-out;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-move {
  transition: transform 0.3s ease;
}

.list-leave-active {
  transition: all 0.2s ease-in;
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
