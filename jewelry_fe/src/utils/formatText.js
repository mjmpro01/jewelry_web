import dayjs from "dayjs"

export const formatCurrency = (text) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)
}

export const formatQuantity = text => {
  return String(text).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
}

export const formatDate = text => {
  return dayjs(text).format('DD/MM/YYYY')
}