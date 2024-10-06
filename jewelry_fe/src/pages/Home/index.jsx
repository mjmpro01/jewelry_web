import ProductCard from "../../components/ProductCard"

const Home = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map(index => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home