import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard"
import productsApi from "../../apis/products"
import PaginationComponent from "../../components/Pagination"
import { useSearchParams } from "react-router-dom"
import { formatSearchParams } from "../../utils/formatSearchParams"

const Products = () => {
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState()

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: products, meta } = await productsApi
        .getAll(formatSearchParams(searchParams))
        .then(res => res?.data)
      setProducts(products)
      setPagination(meta?.pagination)
    }

    fetchData()
  }, [searchParams])

  return (
    <div className="p-4">
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