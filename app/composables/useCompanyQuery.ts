const tagOptions = [
  'tecnologia',
  'software',
  'saas',
  'outsourcing',
  'fintech',
  'healthtech',
  'cloud',
  'erp',
  'analytics',
  'compliance',
  'ecommerce',
  'regtech',
  'telecom',
] as const
type Tag = (typeof tagOptions)[number]

const workModelOptions = ['remote', 'hybrid', 'on-site']
type WorkModel = (typeof workModelOptions)[number]

const companySizeOptions = ['startup', 'small', 'medium', 'large', 'enterprise']
type CompanySize = (typeof companySizeOptions)[number]

export const useCompanyQuery = () => {
  const search = useState<string>('companyQuery:search', () => '')

  const selectedTags = useState<Tag[]>('companyQuery:tags', () => [])
  const selectedWorkModels = useState<WorkModel[]>('companyQuery:workModels', () => [])
  const selectedCompanySizes = useState<CompanySize[]>('companyQuery:companySizes', () => [])

  const selectedCountry = useState<string | undefined>('companies:selectedCountry', () => undefined)

  const toggleTag = (tag: Tag) => {
    selectedTags.value = selectedTags.value.includes(tag)
      ? selectedTags.value.filter((item) => item !== tag)
      : [...selectedTags.value, tag]
  }

  const toggleWorkModel = (workModel: WorkModel) => {
    selectedWorkModels.value = selectedWorkModels.value.includes(workModel)
      ? selectedWorkModels.value.filter((item) => item !== workModel)
      : [...selectedWorkModels.value, workModel]
  }

  const toggleCompanySize = (companySize: CompanySize) => {
    selectedCompanySizes.value = selectedCompanySizes.value.includes(companySize)
      ? selectedCompanySizes.value.filter((item) => item !== companySize)
      : [...selectedCompanySizes.value, companySize]
  }

  const clear = () => {
    search.value = ''
    selectedTags.value = []
    selectedWorkModels.value = []
    selectedCompanySizes.value = []
    selectedCountry.value = undefined
  }

  return {
    search,

    tagOptions,
    selectedTags,
    toggleTag,

    companySizeOptions,
    selectedCompanySizes,
    toggleCompanySize,

    workModelOptions,
    selectedWorkModels,
    toggleWorkModel,

    selectedCountry,

    clear,
  }
}
