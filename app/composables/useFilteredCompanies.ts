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
  const {
    search,
    selectedTags,
    selectedWorkModels,
    selectedCompanySizes,
    selectedCountry,
    selectedCompanyType,
  } = useCompanyQuery()
  const { getCountryOption } = useCountry()
  const { normalizeCompanySize } = useCompanyLabels()

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

      const matchesCompanySize =
        selectedCompanySizes.value.length === 0 ||
        selectedCompanySizes.value.some((size) => normalizeCompanySize(company.size) === size)

      const matchesCountry = !selectedCountry.value || company.country === selectedCountry.value

      const matchesCompanyType =
        selectedCompanyType.value === 'all' || company.kind === selectedCompanyType.value

      return (
        matchesSearch &&
        matchesTags &&
        matchesWorkModel &&
        matchesCompanySize &&
        matchesCountry &&
        matchesCompanyType
      )
    }),
  )

  const countryOptions = computed(() => {
    const countries = [...new Set(allCompanies.map((company) => company.country))]
    return countries.map((country) => getCountryOption(country))
  })

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
    countryOptions,
  }
}
