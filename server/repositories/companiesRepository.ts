import companiesData from '~~/data/companies.json'
import type { Company } from '~~/server/types/company'

const companies = companiesData.companies as Company[]

export const companiesRepository = {
  findAll: (): Company[] => companies,
  findBySlug: (slug: string): Company | undefined =>
    companies.find((company) => company.slug === slug),
}
