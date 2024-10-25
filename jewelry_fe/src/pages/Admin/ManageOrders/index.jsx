import { message, Space, Table, Tag, Tooltip } from "antd"
import { Fragment, useEffect, useState } from "react"
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'

import ordersApi from "../../../apis/orders"
import { formatCurrency, formatDate } from "../../../utils/formatText"
import ViewDrawerOrder from "../../../components/ViewDrawerOrder"
import { translatedOrderStatus } from "../../../constants/orderStatus"
// import CreateOrderModal from "../../../components/CreateOrderModal"

const ManageOrders = () => {
  const [orders, setOrders] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [isOpenViewDrawer, setIsOpenViewDrawer] = useState(false);
  // const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const onOpenViewDrawer = (orderRecord) => {
    const selectedOrderIndex = orders.findIndex(order => Number(order.id) === Number(orderRecord.id))

    if (selectedOrderIndex !== -1) {
      setSelectedOrder(orders[selectedOrderIndex])
      setIsOpenViewDrawer(true)
    } else {
      message.error("Có lỗi xảy ra")
    }
  }

  const onDelete = async (orderRecord) => {
    await ordersApi?.delete(orderRecord?.id, true).then(async () => {
      message.success("Xoá thành công");
      await fetchData()
    })
  }

  const onCloseViewDrawer = () => {
    setIsOpenViewDrawer(false)
  }

  // const onOpenCreateModal = () => {
  //   setIsOpenCreateModal(true);
  // }

  const fetchData = async () => {
    const orders = await ordersApi.getAll({ populate: 'deep,2' }, true)
      .then(res => {
        setOrders(res?.data || [])
        return res?.data
      })

    const dataSource = orders.map((order, index) => {
      return {
        key: index + 1,
        id: order?.id || -1,
        userName: order?.user?.name || '',
        orderItems: order?.orderItems?.length || '',
        status: translatedOrderStatus[order?.status] || '',
        totalAmount: formatCurrency(order?.totalAmount) || '',
        shippingAddress: order?.shippingAddress || '',
        paymentMethod: order?.paymentMethod || 0,
        createdAt: formatDate(order?.createdAt)
      }
    })
    setDataSource(dataSource)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      fixed: 'left',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Người mua',
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'orderItems',
      key: 'orderItems',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem">
            <Tag
              color="blue"
              className="cursor-pointer"
              onClick={() => onOpenViewDrawer(record)}
            >
              <EyeOutlined />
            </Tag>
          </Tooltip>

          <Tooltip title="Xoá">
            <Tag
              color="red"
              className="cursor-pointer"
              onClick={() => onDelete(record)}
            >
              <DeleteOutlined />
            </Tag>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <Fragment>
      {/* <div className="flex items-start justify-between mb-4">
        <Button
          type="primary"
          className="p-[7px_15px] h-auto"
          onClick={onOpenCreateModal}
        >
          Thêm đơn hàng mới
        </Button>
      </div> */}

      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content' }}
      />

      {isOpenViewDrawer && (
        <ViewDrawerOrder
          open={isOpenViewDrawer}
          onClose={onCloseViewDrawer}
          order={selectedOrder}
          refetchData={fetchData}
        />
      )}

      {/* {isOpenCreateModal && (
        <CreateOrderModal
          isModalOpen={isOpenCreateModal}
          handleOk={() => {
            setIsOpenCreateModal(false);
            fetchData();
          }}
          handleCancle={() => setIsOpenCreateModal(false)}
        />
      )} */}
    </Fragment>
  )
}

export default ManageOrders