import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard"
import productsApi from "../../apis/products"
import PaginationComponent from "../../components/Pagination"
import { useLocation, useSearchParams } from "react-router-dom"
import { formatSearchParams } from "../../utils/formatSearchParams"
import { Select } from "antd"
import queryString from "query-string"

const Products = () => {
  const location = useLocation();
  const { state } = location

  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState()
  const [selectedSortOption, setSelectedSortOption] = useState('default')

  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    {
      label: "Mặc định",
      value: 'default',
    },
    {
      label: "Giá thấp đến cao",
      value: "ASC",
    },
    {
      label: "Giá cao đến thấp",
      value: "DESC",
    }
  ]

  useEffect(() => {
    const getAllParams = state?.categoryId
      ? { ...formatSearchParams(searchParams), categoryId: Number(state?.categoryId) }
      : formatSearchParams(searchParams)

    const fetchData = async () => {
      const { data: products, meta } = await productsApi
        .getAll(getAllParams)
        .then(res => res?.data)
      setProducts(products)
      setPagination(meta?.pagination)
    }

    fetchData()
  }, [searchParams, state?.categoryId])

  return (
    <div className="p-4">
      <div className="flex items-center justify-end gap-4 p-4">
        <p>
          Sắp xếp theo:
        </p>

        <Select
          options={sortOptions}
          value={selectedSortOption}
          onChange={(value) => {
            setSelectedSortOption(value);
            if (value === 'default') {
              const newSearchParams = new URLSearchParams({
                ...queryString.parse(location.search)
              }).delete("orderBy", "value");
              setSearchParams(newSearchParams);
            } else {
              const newSearchParams = new URLSearchParams({
                ...queryString.parse(location.search),
                orderBy: 'price',
                order: value
              });
              setSearchParams(newSearchParams);
            }
          }}
          className="w-[180px]"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <PaginationComponent pagination={pagination} />
      </div>
    </div>
  )
}

export default Products