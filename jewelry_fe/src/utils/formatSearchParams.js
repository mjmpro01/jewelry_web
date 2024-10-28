export const formatSearchParams = (params) => {
  const transformedData = {
    pagination: {
      page: 1,
      pageSize: 12
    },
    filter: {}
  }

  params.forEach((value, key) => {
    if (key === 'page' || key === 'pageSize') {
      transformedData.pagination[key] = value
    } else if (key === 'categoryId') {
      if (value === '-1') {
        delete (transformedData.filter[key])
      } else {
        transformedData.filter = {
          ...transformedData.filter,
          [key]: [...(transformedData.filter[key] || []), value]
        }
      }
    }
  });

  return { ...transformedData.pagination, ...transformedData.filter }
}