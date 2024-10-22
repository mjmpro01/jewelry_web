import { Button, Drawer, Form, Input, message, Select } from "antd"
import { useEffect, useState } from "react"
import usersApi from "../../apis/users";
import { roleOptions } from "../../constants/roles";

const ViewDrawerUser = ({ open, onClose, user, refetchData, ...rest }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [userData, setUserData] = useState()

  const [form] = Form.useForm(); // Get form instance

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await usersApi.getById(user.id, true).then(res => res?.data?.data)

      setUserData(userData)
      form.setFieldsValue({
        id: userData?.id,
        name: userData?.name || '',
        username: userData?.username || '',
        email: userData?.email || '',
        password: '',
        roles: userData?.roles || [],
      });
    }

    fetchUser();
  }, [user, form]);

  const onFinish = async (values) => {
    setIsSubmitLoading(true);
    await usersApi.update(userData?.id, {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      roles: values.roles
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
            label={"Tên user"}
            name={"name"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Username"}
            name={"username"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Email"}
            name={"email"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Password"}
            name={"password"}
          >
            <Input
              type="password"
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Roles"}
            name={"roles"}
          >
            <Select
              disabled={!isEdit}
              onChange={(value) => {
                console.log(`selected ${value}`)
              }}
              options={roleOptions}
              mode="multiple"
              allowClear
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

export default ViewDrawerUser