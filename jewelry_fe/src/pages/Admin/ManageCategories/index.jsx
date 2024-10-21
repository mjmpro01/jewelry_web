import { Button, message, Space, Table, Tag, Tooltip } from "antd"
import { Fragment, useEffect, useState } from "react"
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import categoriesApi from "../../../apis/categories"
import ViewDrawerCategory from "../../../components/ViewDrawerCategory"
import CreateCategoryModal from "../../../components/CreateCategoryModal";

const ManageCategories = () => {
  const [categories, setCategories] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [isOpenViewDrawer, setIsOpenViewDrawer] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const onOpenViewDrawer = (categoryRecord) => {
    const selectedCatIndex = categories.findIndex(cat => Number(cat.id) === Number(categoryRecord.id))

    if (selectedCatIndex !== -1) {
      setSelectedCategory(categories[selectedCatIndex])
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

  const onOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  }

  const fetchData = async () => {
    const categories = await categoriesApi.getAll({ populate: 'deep,2' })
      .then(res => {
        setCategories(res?.data?.data || [])
        return res?.data?.data
      })
      .then(data => data?.map((item, index) => ({
        key: index + 1,
        id: item?.id || -1,
        name: item?.name || '',
        description: item?.description || '',
        slug: item?.slug || '',
        productQuantity: item?.products?.length || 0
      })));
    setDataSource(categories)
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
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      ellipsis: true,
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'productQuantity',
      key: 'productQuantity',
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
      <div className="flex items-start justify-between mb-4">
        <Button
          type="primary"
          className="p-[7px_15px] h-auto"
          onClick={onOpenCreateModal}
        >
          Thêm danh mục mới
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content' }}
      />

      {isOpenViewDrawer && (
        <ViewDrawerCategory
          open={isOpenViewDrawer}
          onClose={onCloseViewDrawer}
          category={selectedCategory}
          refetchData={fetchData}
        />
      )}

      {isOpenCreateModal && (
        <CreateCategoryModal
          isModalOpen={isOpenCreateModal}
          handleOk={() => {
            setIsOpenCreateModal(false);
            fetchData();
          }}
          handleCancle={() => setIsOpenCreateModal(false)}
        />
      )}
    </Fragment>
  )
}

export default ManageCategories