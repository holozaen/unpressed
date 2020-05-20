function getPagination({ page, pageSize }, total) {
  if (!page) throw new Error("need page - maybe pass options object")
  if (!page) throw new Error("need pageSize - maybe pass options object")
  if (!total) throw new Error("need total - please pass from meta query result")
  const offset = (page - 1) * pageSize
  let lastPage = Math.ceil(total / pageSize)
  return {
    current_page: page,
    from: (page - 1) * pageSize + 1,
    to: offset + pageSize,
    last_page: lastPage,
    total: total
  }
}
export { getPagination }
