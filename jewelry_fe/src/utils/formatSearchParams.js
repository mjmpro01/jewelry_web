export const formatSearchParams = (params) => {
  const transformedData = {
    pagination: {
      page: 1,
      pageSize: 12
    }
  }

  params.forEach((value, key) => {
    if (key === 'page' || key === 'pageSize') {
      transformedData.pagination[key] = value
    }
  });

  return { ...transformedData.pagination }
}