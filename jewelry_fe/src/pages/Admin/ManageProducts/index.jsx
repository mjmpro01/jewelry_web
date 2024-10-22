import { Avatar, Button, message, Space, Table, Tag, Tooltip } from "antd"
import { Fragment, useEffect, useState } from "react"
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import productsApi from "../../../apis/products"
import { formatCurrency, formatQuantity } from "../../../utils/formatText"
import ViewDrawerProduct from "../../../components/ViewDrawerProduct"
import categoriesApi from "../../../apis/categories"
import CreateProductModal from "../../../components/CreateProductModal"

const ManageProducts = () => {

  const [products, setProducts] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [selectedProduct, setSelectedProduct] = useState()
  const [isOpenViewDrawer, setIsOpenViewDrawer] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const onOpenViewDrawer = (productRecord) => {
    const selectedCatIndex = products.findIndex(cat => Number(cat.id) === Number(productRecord.id))

    if (selectedCatIndex !== -1) {
      setSelectedProduct(products[selectedCatIndex])
      setIsOpenViewDrawer(true)
    } else {
      message.error("Có lỗi xảy ra")
    }
  }

  const onCloseViewDrawer = () => {
    setIsOpenViewDrawer(false)
  }

  const onDelete = async (productRecord) => {
    await productsApi?.delete(productRecord?.id).then(async () => {
      message.success("Xoá thành công");
      await fetchData()
    })
  }

  const onOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  }

  const fetchData = async () => {
    const products = await productsApi.getAll({ populate: 'deep,2', sort: 'createdAt:desc' })
      .then(res => {
        setProducts(res?.data?.data || [])
        return res?.data?.data
      })

    const dataSource = await Promise.all(products?.map(async (item, index) => {
      const category = await categoriesApi.getById(item?.categoryId).then(res => res?.data?.data)

      return {
        key: index + 1,
        id: item?.id || -1,
        image: item?.image,
        gallery: item?.gallery,
        name: item?.name || '',
        price: item?.price || '',
        description: item?.description || '',
        stockQuantity: item?.stockQuantity || '',
        category: category?.name || '',
        slug: item?.slug || '',
        productQuantity: item?.products?.length || 0
      }
    }));
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
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image => {
        return (
          <a href={image} target="_blank">
            <Avatar src={image} />
          </a>
        )
      })
    },
    {
      title: 'Bộ sưu tập',
      dataIndex: 'gallery',
      key: 'gallery',
      render: (gallery => {
        return (
          <Avatar.Group>
            {gallery.map((item, index) => (
              <a href={item} key={index} target="_blank">
                <Avatar src={item} />
              </a>
            ))}
          </Avatar.Group>
        )
      })
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (item => {
        return <p>{formatCurrency(item)}</p>
      })
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      width: 150,
      render: (item => {
        return <p>{formatQuantity(item)}</p>
      })
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
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
          Thêm sản phẩm mới
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content' }}
      />

      {isOpenViewDrawer && (
        <ViewDrawerProduct
          open={isOpenViewDrawer}
          onClose={onCloseViewDrawer}
          product={selectedProduct}
          refetchData={fetchData}
        />
      )}

      {isOpenCreateModal && (
        <CreateProductModal
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

export default ManageProducts