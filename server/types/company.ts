export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
export type CompanyWorkModel = 'remote' | 'hybrid' | 'on-site'

export type Company = {
  id: number
  name: string
  slug: string
  logo: string
  country: string
  city: string
  size: CompanySize
  domain: string
  description: string
  descriptionEn: string
  tags: Array<string>
  workModel: Array<CompanyWorkModel>
  createdAt: string
}
