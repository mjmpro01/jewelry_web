import { Button, Space, Table, Tag } from "antd"
import { Fragment, useEffect } from "react"
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import ordersApi from "../../../apis/orders"

const ManageOrders = () => {

  useEffect(() => {
    const fetchData = async () => {
      const orders = await ordersApi.getAll()
        .then(res => res.data);
      console.log("🚀 ~ file: index.jsx:12 ~ fetchData ~ orders:", orders)
    }

    fetchData()
  }, [])


  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tag color="blue" className="cursor-pointer">
            <EyeOutlined />
          </Tag>
          <Tag color="green" className="cursor-pointer">
            <EditOutlined />
          </Tag>
          <Tag color="red" className="cursor-pointer">
            <DeleteOutlined />
          </Tag>
        </Space>
      )
    }
  ];

  return (
    <Fragment>
      <div className="flex items-start justify-between mb-4">
        <Button type="primary" className="p-[7px_15px] h-auto">
          Thêm đơn hàng mới
        </Button>
      </div>

      <Table dataSource={dataSource} columns={columns} />;
    </Fragment>
  )
}

export default ManageOrders