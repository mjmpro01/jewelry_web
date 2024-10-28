import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard"
import productsApi from "../../apis/products"
import PaginationComponent from "../../components/Pagination"
import { useLocation, useSearchParams } from "react-router-dom"
import { formatSearchParams } from "../../utils/formatSearchParams"
import { Radio, Select } from "antd"
import queryString from "query-string"
import categoriesApi from "../../apis/categories"
import clsx from 'clsx'

const Products = () => {
  const location = useLocation();
  const { state } = location

  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState()
  const [selectedSortOption, setSelectedSortOption] = useState()
  // const [categoryOptions, setCategorytOptions] = useState([])
  const [categories, setCategories] = useState([])
  const [filterCategoryId, setFilterCategoryId] = useState()

  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    {
      label: "Giá thấp đến cao",
      value: "ASC",
    },
    {
      label: "Giá cao đến thấp",
      value: "DESC",
    }
  ]

  const onChange = (e) => {
    setFilterCategoryId(e.target.value)
  };

  useEffect(() => {
    const getAllParams = state?.categoryId
      ? { ...formatSearchParams(searchParams), categoryId: state?.categoryId }
      : filterCategoryId === -1
        ? formatSearchParams(searchParams)
        : { ...formatSearchParams(searchParams), categoryId: filterCategoryId }

    const fetchData = async () => {
      const { data: products, meta } = await productsApi
        .getAll(getAllParams)
        .then(res => res?.data)
      setProducts(products)
      setPagination(meta?.pagination)
    }

    fetchData()
  }, [searchParams, state?.categoryId, filterCategoryId])

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoriesApi.getAll().then(res => res.data.data);

      setCategories(categories)
    };

    fetchCategories();
  }, [])

  return (
    <div className="p-4">

      <div className="flex items-center justify-end gap-4 p-4">

        <Select
          placeholder="Sắp xếp theo:"
          options={sortOptions}
          value={selectedSortOption}
          onChange={(value) => {
            setSelectedSortOption(value);
            const newSearchParams = new URLSearchParams({
              ...queryString.parse(location.search),
              orderBy: 'price',
              order: value
            });
            setSearchParams(newSearchParams);
          }}
          className="w-[180px]"
        />
      </div>

      <div className={clsx("grid", state?.categoryId ? "grid-cols-1" : "grid-cols-[200px_1fr] gap-4")}>
        <div className={clsx(state?.categoryId ? "hidden" : "flex flex-col gap-4")}>
          <p className="font-bold">
            Danh mục
          </p>

          <Radio.Group onChange={onChange} value={filterCategoryId} className="flex flex-col gap-2">
            <Radio value={-1}>
              Tất cả
            </Radio>
            {categories.map((category, index) => (
              <Radio value={category.id} key={index}>
                {category.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <PaginationComponent pagination={pagination} />
          </div>
        </div>

      </div>


    </div>
  )
}

export default Products