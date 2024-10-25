import { Divider, Image, Tag } from "antd"
import { useNavigate } from "react-router-dom"
import { formatCurrency, formatDate } from "../../utils/formatText"
import { orderStatus, translatedOrderStatus } from "../../constants/orderStatus"
import { paths } from "../../constants/paths"

const OrderItem = ({ order }) => {
  const navigate = useNavigate();


  return (
    <div className="w-full rounded-md p-4 bg-gray-50">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <p>Trạng thái:</p>
          <Tag color={order?.status === orderStatus.SUCCESS ? "green" : order?.status === orderStatus?.CANCELLED ? "red" : "blue"} >
            {translatedOrderStatus[order?.status]}
          </Tag>
        </div>

        <div className="flex gap-4">
          <p>
            Ngày tạo: {formatDate(order?.createdAt)}
          </p>
        </div>
      </div>
      <Divider />
      {order.orderItems.map((item, index) => {
        return (
          <div className="flex items-center justify-between mb-4" key={index}>
            <Image src={item.product.image} alt="" width={80} height={80} className="size-[80px] rounded-md" />

            <div className="flex flex-col items-end gap-4">
              <h3
                className="text-lg cursor-pointer"
                onClick={() => navigate(`${paths?.PRODUCTS}/${item?.product?.slug}`)}
              >
                {item?.product?.name} <span className="text-base text-blue-500 font-semibold">x{item?.quantity}</span>
              </h3>
              <p>

              </p>
              <p>
                {formatCurrency(item?.price)}
              </p>
            </div>
          </div>
        )
      })}
      <Divider />
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">
          Tổng:
        </p>

        <p className="text-2xl font-semibold text-red-500">
          {formatCurrency(order?.totalAmount)}
        </p>
      </div>
    </div>
  )
}

export default OrderItem