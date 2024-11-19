import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ordersApi from "../../apis/orders";
import { CloseCircleFilled } from "@ant-design/icons";
import { formatCurrency } from "../../utils/formatText";
import { paths } from "../../constants/paths";

const OrderFail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({ orderCode: "", orderItems: [] });

  useEffect(() => {
    const fetchOrderData = async () => {
      if (orderId) {
        const data = await ordersApi.getById(orderId).then((res) => res?.data);
        setOrderData(data);
      }
    };

    fetchOrderData();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-10">
      <CloseCircleFilled className="text-red-500 text-[80px] mb-[15px]" />
      <p className="text-[40px] font-bold mb-[10px]">Đặt hàng thất bại</p>
      <p className="text-[18px] mb-[5px]">
        Có lỗi đã xảy ra trong quá trình đặt hàng, vui lòng thử lại
      </p>

      {orderData && (
        <div className="max-w-[500px] bg-white w-full p-5 mb-5">
          <p className="text-[20px] font-bold mb-5">Thông tin đơn hàng</p>
          <div className="flex flex-col gap-4">
            {orderData.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-8 p-4 px-0 border-b border-b-gray-300"
              >
                <img
                  src={item?.product?.image}
                  alt=""
                  className="size-[80px]"
                />
                <p className="flex-1">{item?.product?.name}</p>
                <p className="w-[100px] text-right">
                  {formatCurrency(item?.price)}
                </p>
              </div>
            ))}
            <div className="flex items-center">
              <p className="flex-1 text-center font-bold">Tổng</p>
              <p className="w-[100px] text-right">
                {formatCurrency(orderData?.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        className="p-[5px_10px] border-2 rounded-md border-black"
        onClick={() => navigate(paths.HOME)}
      >
        Về trang chủ
      </button>
    </div>
  );
};

export default OrderFail;
