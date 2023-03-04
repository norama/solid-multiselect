import diascritics from 'diacritics'

const SEARCH_CACHE_LIMIT = 100

const valueDiacriticsCache: Record<string, string> = {}
let searchDiacriticsCache: Record<string, string> = {}

export const matchValues = (value: string, search: string, caseSensitiveSearch?: boolean) => {
  valueDiacriticsCache[value] = valueDiacriticsCache[value] ?? diascritics.remove(value)
  searchDiacriticsCache[search] = searchDiacriticsCache[search] ?? diascritics.remove(search)

  value = valueDiacriticsCache[value]
  search = searchDiacriticsCache[search]

  if (Object.keys(searchDiacriticsCache).length > SEARCH_CACHE_LIMIT) {
    searchDiacriticsCache = {}
  }

  console.log('values', valueDiacriticsCache)
  console.log('searches', searchDiacriticsCache)

  if (caseSensitiveSearch) {
    return value.indexOf(search) > -1
  }
  if (value.toLowerCase) {
    return value.toLowerCase().indexOf(search.toLowerCase()) > -1
  }
  return value.toString().indexOf(search) > -1
}
