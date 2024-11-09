import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import productsApi from "../../apis/products";
import ProductCard from "../../components/ProductCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("tim-kiem")

  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const getSearchResult = async () => {
      const result = await productsApi.getAll({
        name: searchText
      }).then(res => res?.data?.data)

      setSearchResult(result);
    }

    getSearchResult()
  }, [searchText])

  return (
    <div className="min-h-[400px] p-4">
      {searchResult?.length ? (
        <>
          <p className="mb-4">
            Kết quả tìm kiếm cho <span className="font-bold italic">{searchText}</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {searchResult?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center py-16">
          Không có kết quả tìm kiếm phù hợp cho <span className="font-bold italic">{searchText}</span>
        </p>
      )}

    </div>
  )
}

export default SearchResult