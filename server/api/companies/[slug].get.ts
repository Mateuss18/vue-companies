import { defineEventHandler, getRouterParam, createError } from 'h3'
import { companiesRepository } from '~~/server/repositories/companiesRepository'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required',
    })
  }

  const company = companiesRepository.findBySlug(slug)

  if (!company) {
    throw createError({
      statusCode: 404,
      message: 'Company not found',
    })
  }

  return {
    data: company,
  }
})
