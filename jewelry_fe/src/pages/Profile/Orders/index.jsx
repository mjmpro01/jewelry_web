import { useEffect, useState } from "react"
import ordersApi from "../../../apis/orders"
import OrderItem from "../../../components/OrderItem"

const ProfileOrders = () => {
  const [myOrders, setMyOrders] = useState([])

  useEffect(() => {
    const fetchMyOrders = async () => {
      const orders = await ordersApi.getMyOrders().then(res => res?.data?.data);

      setMyOrders(orders.sort((a, b) => b.id - a.id));
    }

    fetchMyOrders();
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {myOrders.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  )
}

export default ProfileOrders