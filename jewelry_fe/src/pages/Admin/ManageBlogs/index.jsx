import { Button, Image, message, Space, Table, Tag, Tooltip } from "antd"
import { Fragment, useEffect, useState } from "react"
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'

import { formatDate } from "../../../utils/formatText"
import blogsApi from "../../../apis/blogs"
import ViewDrawerBlog from "../../../components/ViewDrawerBlog"
import CreateBlogModal from "../../../components/CreateBlogModal"

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [isOpenViewDrawer, setIsOpenViewDrawer] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState();

  const onOpenViewDrawer = (orderRecord) => {
    const selectedBlogIndex = blogs.findIndex(order => Number(order.id) === Number(orderRecord.id))

    if (selectedBlogIndex !== -1) {
      setSelectedBlog(blogs[selectedBlogIndex])
      setIsOpenViewDrawer(true)
    } else {
      message.error("Có lỗi xảy ra")
    }
  }

  const onDelete = async (blogRecord) => {
    await blogsApi?.delete(blogRecord?.id, true).then(async () => {
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
    const blogs = await blogsApi.getAll({}, true)
      .then(res => {
        setBlogs(res?.data.data || [])
        return res?.data.data
      })

    const dataSource = blogs.map((blog, index) => {
      return {
        key: index + 1,
        id: blog?.id || -1,
        title: blog?.title || '',
        thumbnail: blog?.thumbnail || '',
        slug: blog?.slug || '',
        content: blog?.content || '',
        createdAt: formatDate(blog?.createdAt)
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
      title: 'Tên blog',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: image => <Image className="size-16 object-cover" src={image} />
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
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
      <div className="flex items-start justify-between mb-4">
        <Button
          type="primary"
          className="p-[7px_15px] h-auto"
          onClick={onOpenCreateModal}
        >
          Thêm blog mới
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content' }}
      />

      {isOpenViewDrawer && (
        <ViewDrawerBlog
          open={isOpenViewDrawer}
          onClose={onCloseViewDrawer}
          blog={selectedBlog}
          refetchData={fetchData}
        />
      )}

      {isOpenCreateModal && (
        <CreateBlogModal
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

export default ManageBlogs