import { useEffect, useState } from "react"
import blogsApi from "../../apis/blogs"
import { formatDate } from "../../utils/formatText"
import { useNavigate } from "react-router-dom"
import { paths } from "../../constants/paths"

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await blogsApi.getAll().then(res => res?.data);

      setBlogs(blogsData?.data);
    }

    fetchBlogs()
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {blogs.map((blog, index) => (
          <div key={index} onClick={() => navigate(`${paths.BLOGS}/${blog?.slug}`)} className="cursor-pointer">
            <img src={blog.thumbnail} className="w-full aspect-square object-cover" />
            <h3 className="font-semibold text-xl line-clamp-1 text-ellipsis">{blog.title}</h3>
            <p className="text-sm">{formatDate(blog.createdAt)}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Blogs