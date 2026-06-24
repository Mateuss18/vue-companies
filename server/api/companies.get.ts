import { defineEventHandler, getQuery } from 'h3'
import { companiesRepository } from '~~/server/repositories/companiesRepository'

const companies = companiesRepository.findAll()

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const page = Math.max(1, Number.parseInt(String(query.page ?? '1'), 10) || 1)
  const perPage = Math.min(
    50,
    Math.max(1, Number.parseInt(String(query.perPage ?? '15'), 10) || 15),
  )

  const start = (page - 1) * perPage
  const data = companies.slice(start, start + perPage)

  return {
    data,
    meta: {
      page,
      perPage,
      total: companies.length,
      totalPages: Math.ceil(companies.length / perPage),
    },
  }
})
