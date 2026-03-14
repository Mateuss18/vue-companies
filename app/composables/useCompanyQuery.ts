const tagOptions = [
  'tecnologia',
  'consultoria',
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

const workModelOptions = ['Remoto', 'Híbrido', 'Presencial']
type WorkModel = (typeof workModelOptions)[number]

export const useCompanyQuery = () => {
  const search = useState<string>('companyQuery:search', () => '')

  const selectedTags = useState<Tag[]>('companyQuery:tags', () => [])
  const selectedWorkModels = useState<WorkModel[]>('companyQuery:workModels', () => [])

  const clear = () => {
    search.value = ''
    selectedTags.value = []
    selectedWorkModels.value = []
  }

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

  return {
    search,

    tagOptions,
    selectedTags,
    toggleTag,

    workModelOptions,
    selectedWorkModels,
    toggleWorkModel,

    clear,
  }
}
