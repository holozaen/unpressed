function validateFilter({ operator, value }) {
  if (undefined === operator || !operator)
    throw new Error(`filter has no operator defined`)
  if (undefined === value || !value)
    throw new Error(`filter has no value defined`)
  return true
}

function getSingleFilterString({ operator, value }) {
  return `${operator}:${value}`
}

function getMultiFilterString(filters) {
  let arr = []
  filters.forEach(filter => {
    validateFilter(filter)
    arr.push(`${filter.operator}:${filter.value}`)
  })
  return arr.join(",")
}

function getFilterString(filters) {
  if (!filters) return ""

  if (!Array.isArray(filters)) {
    validateFilter(filters)
    return ", where: {" + getSingleFilterString(filters) + "}"
  }

  if (filters.length === 0) {
    return ""
  }

  let filterString = ""
  filterString += ", where: {"
  filterString += getMultiFilterString(filters)
  filterString += "}"
  return filterString
}

export { getFilterString }
