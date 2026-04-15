import countriesLib from 'i18n-iso-countries'

const countryKeyMap = {
  Australia: 'australia',
  Belgium: 'belgium',
  Brazil: 'brazil',
  Canada: 'canada',
  Chile: 'chile',
  Denmark: 'denmark',
  Estonia: 'estonia',
  Finland: 'finland',
  France: 'france',
  Germany: 'germany',
  global: 'global',
  India: 'india',
  Indonesia: 'indonesia',
  Italy: 'italy',
  Japan: 'japan',
  Malaysia: 'malaysia',
  Mexico: 'mexico',
  Nepal: 'nepal',
  Netherlands: 'netherlands',
  Philippines: 'philippines',
  Poland: 'poland',
  Portugal: 'portugal',
  Romania: 'romania',
  Singapore: 'singapore',
  'South Africa': 'southAfrica',
  Spain: 'spain',
  Sweden: 'sweden',
  Switzerland: 'switzerland',
  Ukraine: 'ukraine',
  'United Kingdom': 'unitedKingdom',
  'United States': 'unitedStates',
  Uruguay: 'uruguay',
} as const

type CountryInput = keyof typeof countryKeyMap

export const useCountry = () => {
  const { t, te } = useI18n()

  const getCountryCode = (countryName: string) => {
    if (!countryName) return ''
    if (countryName.toLowerCase() === 'global') return 'Global'

    return (countriesLib.getAlpha2Code(countryName, 'en') || '').toLowerCase()
  }

  const normalizeCountry = (countryName: string) => {
    return countryKeyMap[countryName as CountryInput] ?? null
  }

  const getCountryLabel = (countryName: string) => {
    const normalizedCountry = normalizeCountry(countryName)

    if (!normalizedCountry) return countryName

    const translationKey = `common.countries.${normalizedCountry}`

    return te(translationKey) ? t(translationKey) : countryName
  }

  const getCountryOption = (countryName: string) => {
    const code = getCountryCode(countryName)

    return {
      name: getCountryLabel(countryName),
      value: countryName,
      code,
    }
  }

  return {
    getCountryCode,
    getCountryLabel,
    getCountryOption,
  }
}
