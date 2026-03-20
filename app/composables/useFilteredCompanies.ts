import dataCompanies from '../../data/companies.json'

type Company = (typeof dataCompanies.companies)[number]

const companies = dataCompanies.companies as Company[]

export const useCompanies = () => {
  const estimatedCompaniesAdded = Math.floor(companies.length / 10) * 10

  return { companies, estimatedCompaniesAdded }
}

export const useFilteredCompanies = () => {
  const { search, selectedTags, selectedWorkModels } = useCompanyQuery()

  const filteredCompanies = computed(() =>
    companies.filter((company) => {
      const matchesSearch =
        search.value.trim() === '' ||
        company.name.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())

      const matchesTags =
        selectedTags.value.length === 0 ||
        selectedTags.value.some((tag) => company.tags.includes(tag))

      const matchesWorkModel =
        selectedWorkModels.value.length === 0 ||
        selectedWorkModels.value.some((workModel) => company.workModel.includes(workModel))

      return matchesSearch && matchesTags && matchesWorkModel
    }),
  )

  const resultsCount = computed(() => filteredCompanies.value.length)

  const pageSize = 15
  const visibleCount = useState<number>('companies:visibleCount', () => pageSize)

  const visibleCompanies = computed(() => filteredCompanies.value.slice(0, visibleCount.value))

  const resetVisibleCount = () => {
    visibleCount.value = pageSize
  }

  const loadMore = () => {
    visibleCount.value = Math.min(visibleCount.value + pageSize, resultsCount.value)
  }

  return {
    filteredCompanies,
    resultsCount,
    pageSize,
    visibleCount,
    visibleCompanies,
    resetVisibleCount,
    loadMore,
  }
}
