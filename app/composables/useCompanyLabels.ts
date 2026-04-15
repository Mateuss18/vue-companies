const workModelKeyMap = {
  remote: 'remote',
  hybrid: 'hybrid',
  'on-site': 'onSite',
} as const

const companySizeKeyMap = {
  startup: 'startup',
  small: 'small',
  medium: 'medium',
  large: 'large',
  enterprise: 'enterprise',
} as const

type WorkModelInput = keyof typeof workModelKeyMap
type CompanySizeInput = keyof typeof companySizeKeyMap

export const useCompanyLabels = () => {
  const { t } = useI18n()

  const normalizeWorkModel = (workModel: string) => {
    return workModelKeyMap[workModel as WorkModelInput] ?? null
  }

  const normalizeCompanySize = (companySize: string) => {
    return companySizeKeyMap[companySize as CompanySizeInput] ?? null
  }

  const getWorkModelLabel = (workModel: string) => {
    const normalizedWorkModel = normalizeWorkModel(workModel)

    return normalizedWorkModel ? t(`common.workModels.${normalizedWorkModel}`) : workModel
  }

  const getCompanySizeLabel = (companySize: string) => {
    const normalizedCompanySize = normalizeCompanySize(companySize)

    return normalizedCompanySize ? t(`common.companySizes.${normalizedCompanySize}`) : companySize
  }

  return {
    normalizeWorkModel,
    normalizeCompanySize,
    getWorkModelLabel,
    getCompanySizeLabel,
  }
}
