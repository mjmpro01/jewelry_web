import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsApi from "../../apis/blogs";
import { formatContent } from "../../utils/formatContent";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState()
  console.log("🚀 ~ file: index.jsx:9 ~ BlogDetail ~ blog:", blog)

  useEffect(() => {
    const fetchProductDetail = async (slug) => {
      const data = await blogsApi.getBySlug(slug).then(res => res?.data?.data)

      setBlog(data)
    }

    if (slug) {
      fetchProductDetail(slug)
    }
  }, [slug])

  return (
    <div className="mx-4">
      <p className="mx-auto text-center text-3xl max-w-[500px]">
        {blog?.title}
      </p>
      <div>
        {formatContent(blog?.content)}
      </div>
    </div>
  )
}

export default BlogDetail