import { message, Space, Table, Tag, Tooltip } from "antd"
import { Fragment, useEffect, useState } from "react"
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import categoriesApi from "../../../apis/categories"
import usersApi from "../../../apis/users"
import ViewDrawerUser from "../../../components/ViewDrawerUser"

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [isOpenViewDrawer, setIsOpenViewDrawer] = useState(false);
  // const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const onOpenViewDrawer = (userRecord) => {
    const selectedUserIndex = users.findIndex(user => Number(user.id) === Number(userRecord.id))

    if (selectedUserIndex !== -1) {
      setSelectedUser(users[selectedUserIndex])
      setIsOpenViewDrawer(true)
    } else {
      message.error("Có lỗi xảy ra")
    }
  }

  const onDelete = async (categoryRecord) => {
    await categoriesApi?.delete(categoryRecord?.id).then(async () => {
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
    const users = await usersApi.getAll({ populate: 'deep,2' })
      .then(res => {
        setUsers(res?.data?.data || [])
        return res?.data?.data
      })
      .then(data => data?.map((item, index) => ({
        key: index + 1,
        id: item?.id || -1,
        name: item?.name || '',
        username: item?.username || '',
        email: item?.email || '',
        roles: item?.roles || []
      })));
    setDataSource(users)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 80
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Tên user',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = role === 'ADMIN' ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
          Thêm User mới
        </Button>
      </div> */}

      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content' }}
      />

      {isOpenViewDrawer && (
        <ViewDrawerUser
          open={isOpenViewDrawer}
          onClose={onCloseViewDrawer}
          user={selectedUser}
          refetchData={fetchData}
        />
      )}

      {/* {isOpenCreateModal && (
        <CreateUserModal
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

export default ManageUsers