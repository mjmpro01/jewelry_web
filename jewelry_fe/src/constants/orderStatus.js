export const orderStatus = {
  PENDING: 'Chờ xác nhận',
  PROCESSING: 'Đang chuẩn bị hàng',
  SHIPPED: 'Đang vận chuyển',
  DELIVERED: 'Đã giao hàng',
  SUCCESS: 'Thành công',
  CANCELLED: 'Đã huỷ',
}

export const translatedOrderStatus = {
  pending: 'Chờ xác nhận',
  processing: 'Đang chuẩn bị hàng',
  shipped: 'Đang vận chuyển',
  dilivered: 'Đã giao hàng',
  success: 'Thành công',
  cancelled: 'Đã huỷ',
}

export const orderStatusOptions = [
  {
    label: orderStatus.PENDING,
    value: 'pending',
  },
  {
    label: orderStatus.PROCESSING,
    value: 'processing',
  },
  {
    label: orderStatus.SHIPPED,
    value: 'shipped',
  },
  {
    label: orderStatus.DELIVERED,
    value: 'delivered',
  },
  {
    label: orderStatus.SUCCESS,
    value: 'success',
  },
  {
    label: orderStatus.CANCELLED,
    value: 'cancelled',
  },
]