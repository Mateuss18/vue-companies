import dataCompanies from '../../data/companies.json'
import dataConsultancies from '../../data/consultancies.json'

type RawCompany = (typeof dataCompanies.companies)[number]
type RawConsultancy = (typeof dataConsultancies.consultancies)[number]

type DirectoryItem =
  | (RawCompany & { kind: 'company' })
  | (RawConsultancy & {
      kind: 'consultancy'
      tags: string[]
      workModel: string[]
      city?: string
      logo?: string
    })

const allCompanies: DirectoryItem[] = [
  ...dataCompanies.companies.map((company) => ({
    ...company,
    kind: 'company' as const,
  })),
  ...dataConsultancies.consultancies.map((consultancy) => ({
    ...consultancy,
    kind: 'consultancy' as const,
    tags: [],
    workModel: [],
    city: undefined,
    logo: undefined,
  })),
]

export const useCompanies = () => {
  const estimatedCompaniesAdded = Math.floor(allCompanies.length / 10) * 10

  return { companies: allCompanies, estimatedCompaniesAdded }
}

export const useFilteredCompanies = () => {
  const { search, selectedTags, selectedWorkModels } = useCompanyQuery()

  const filteredCompanies = computed(() =>
    allCompanies.filter((company) => {
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
