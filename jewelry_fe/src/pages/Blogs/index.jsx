import { useEffect, useState } from "react"
import blogsApi from "../../apis/blogs"
import { formatDate } from "../../utils/formatText"

const Blogs = () => {
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
          <div key={index}>
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