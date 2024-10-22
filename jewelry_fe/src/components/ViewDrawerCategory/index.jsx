import { Button, Drawer, Form, Input, message } from "antd"
import { useEffect, useState } from "react"
import categoriesApi from "../../apis/categories"

const ViewDrawerCategory = ({ open, onClose, category, refetchData, ...rest }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [categoryData, setCategoryData] = useState()

  const [form] = Form.useForm(); // Get form instance

  useEffect(() => {
    const fetchCategory = async () => {
      const catData = await categoriesApi.getById(category.id, true).then(res => res?.data?.data)

      setCategoryData(catData)
      form.setFieldsValue({
        id: catData.id,
        name: catData.name,
        description: catData.description,
        slug: catData.slug,
        productQuantity: catData.products?.length || 0,
      });
    }

    fetchCategory();
  }, [category, form]);

  const onFinish = async (values) => {
    setIsSubmitLoading(true);
    await categoriesApi.update(categoryData?.id, {
      name: values.name,
      description: values.description,
    }, true).then(() => {
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
          labelCol={{ span: 4 }}
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
            label={"Tên danh mục"}
            name={"name"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Mô tả"}
            name={"description"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Slug"}
            name={"slug"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item
            label={"Số sản phẩm"}
            name={"productQuantity"}
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

export default ViewDrawerCategory