import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsApi from "../../apis/blogs";
import { formatContent } from "../../utils/formatContent";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState()

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
    <article className="mx-4">
      <h2 className="mx-auto text-center text-3xl max-w-[500px] mb-8">
        {blog?.title}
      </h2>
      <div className="prose mx-auto max-w-[1000px]">
        {formatContent(blog?.content)}
      </div>
    </article>
  )
}

export default BlogDetail