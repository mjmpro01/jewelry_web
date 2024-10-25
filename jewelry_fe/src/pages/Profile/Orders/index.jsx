import { useEffect, useState } from "react"
import ordersApi from "../../../apis/orders"
import OrderItem from "../../../components/OrderItem"
import { Empty, Segmented } from "antd"
import { orderStatusOptions, translatedOrderStatus } from "../../../constants/orderStatus"

const ALL = 'Tất cả'

const ProfileOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const [showedOrder, setShowedOrder] = useState([])
  const [currentSegment, setCurrentSegment] = useState(orderStatusOptions[0].label)

  useEffect(() => {
    const fetchMyOrders = async () => {
      const orders = await ordersApi.getMyOrders().then(res => res?.data?.data);

      setMyOrders(orders.sort((a, b) => b.id - a.id));
    }

    fetchMyOrders();
  }, [])

  useEffect(() => {
    if (currentSegment === ALL) {
      setShowedOrder(myOrders);
    } else {
      setShowedOrder(myOrders.filter(order =>
        translatedOrderStatus[order.status] === currentSegment
      ))
    }

  }, [myOrders, currentSegment])

  return (
    <>
      <Segmented
        options={[ALL, ...orderStatusOptions.map(option => option.label)]}
        onChange={(value) => {
          setCurrentSegment(value); // string
        }}
        className="w-full mb-4"
        size="large"
        value={currentSegment}
      />
      <div className="flex flex-col gap-4">
        {showedOrder.length ? showedOrder.map((order, index) => (
          <OrderItem key={index} order={order} />
        )) : <Empty description={false} />}
      </div>
    </>
  )
}

export default ProfileOrders