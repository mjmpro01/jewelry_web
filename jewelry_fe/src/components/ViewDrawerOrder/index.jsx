import { Button, Drawer, Form, Input, message, Select, Table } from "antd"
import { useEffect, useState } from "react"
import ordersApi from "../../apis/orders";
import { formatCurrency } from "../../utils/formatText";
import dayjs from "dayjs";
import usersApi from "../../apis/users";
import { orderStatusOptions } from "../../constants/orderStatus";

const ViewDrawerOrder = ({ open, onClose, order, refetchData, ...rest }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [orderData, setOrderData] = useState()
  const [userOptions, setUserOptions] = useState([])
  const [orderDataSource, setOrderDataSource] = useState([])

  const [form] = Form.useForm(); // Get form instance

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
  ]


  useEffect(() => {
    const fetchOrder = async () => {
      const orderData = await ordersApi.getById(order.id).then(res => res?.data)

      setOrderData(orderData)
      form.setFieldsValue({
        id: orderData?.id,
        userId: orderData?.user?.id || '',
        orderItems: orderData?.orderItems || '',
        status: orderData?.status || '',
        totalAmount: formatCurrency(orderData?.totalAmount) || '',
        shippingAddress: orderData?.shippingAddress || '',
        paymentMethod: orderData?.paymentMethod || 0,
        createdAt: dayjs(orderData?.createdAt).format('DD/MM/YYYY')
      });

      const dataSource = orderData?.orderItems?.map(order => ({
        name: order?.product?.name,
        quantity: order?.quantity,
        price: formatCurrency(order?.product?.price),
      }))

      setOrderDataSource(dataSource)
    }

    fetchOrder();
  }, [order, form]);

  useEffect(() => {
    const fetchUserOptions = async () => {
      const usersData = await usersApi.getAll().then(res => res?.data?.data);

      const userOptions = usersData.map(data => ({
        label: data?.name,
        value: data?.id,
      }))

      setUserOptions(userOptions)
    }

    fetchUserOptions();
  }, [])

  const onFinish = async (values) => {
    setIsSubmitLoading(true);
    await ordersApi.update(orderData?.id, {
      userId: values.userId,
      status: values.status,
      shippingAddress: values.shippingAddress
    }).then(() => {
      setTimeout(async () => {
        setIsSubmitLoading(false);
        setIsEdit(false)
        await refetchData();
        message.success("Sửa thành công")
        onClose();
        return;
      }, 1500)
    }).catch(e => {
      console.log(e);
      setIsSubmitLoading(false);
      return;
    })


  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={756}
      destroyOnClose
      {...rest}
    >
      <div className="flex flex-col gap-4">
        <Form
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={"ID"}
            name={"id"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item
            label={"Khách hàng"}
            name={"userId"}
          >
            <Select
              disabled={!isEdit}
              onChange={(value) => {
                console.log(`selected ${value}`)
              }}
              options={userOptions}
            />
          </Form.Item>

          <Form.Item
            label={"Danh sách"}
            name={"orderItems"}
          >
            <Table
              columns={columns}
              dataSource={orderDataSource}
              pagination={false}
            />
          </Form.Item>

          <Form.Item
            label={"Trạng thái"}
            name={"status"}
          >
            <Select
              disabled={!isEdit}
              onChange={(value) => {
                console.log(`selected ${value}`)
              }}
              options={orderStatusOptions}
            />
          </Form.Item>

          <Form.Item
            label={"Địa chỉ giao hàng"}
            name={"shippingAddress"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Phương thức thanh toán"}
            name={"paymentMethod"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item
            label={"Tổng cộng"}
            name={"totalAmount"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item
            label={"Ngày tạo"}
            name={"createdAt"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end w-full">
              {isEdit ? (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setIsEdit(false)}
                  >
                    Huỷ
                  </Button>

                  <Button
                    // onClick={() => setIsEdit(false)}
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitLoading}
                  >
                    Xác nhận
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEdit(true)}
                >
                  Sửa
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  )
}

export default ViewDrawerOrder