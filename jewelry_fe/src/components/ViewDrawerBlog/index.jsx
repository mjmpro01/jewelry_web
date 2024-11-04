import { Button, Drawer, Form, Input, message } from "antd"
import { useEffect, useState } from "react"
import { formatDate } from "../../utils/formatText";
import blogsApi from "../../apis/blogs";
import TextEditor from "../TextEditor";
import UploadImages from "../UploadImages";

const ViewDrawerBlog = ({ open, onClose, blog, refetchData, ...rest }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [blogData, setBlogData] = useState()
  const [contentValue, setContentValue] = useState('');
  const [imageFileList, setImageFileList] = useState([])

  const [form] = Form.useForm(); // Get form instance

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await blogsApi.getById(blog.id, true).then(res => res?.data?.data)

      setBlogData(blogData)

      setContentValue(blogData?.content)

      const imageFileList = blogData.thumbnail ? [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: blogData.thumbnail,  // Assuming prodData.image contains the image URL
      }] : [];

      setImageFileList(imageFileList)

      form.setFieldsValue({
        id: blogData?.id,
        title: blogData?.title || '',
        slug: blogData?.slug || '',
        thumbnail: blogData?.thumbnail || '',
        content: blogData?.content || '',
        createdAt: formatDate(blogData?.createdAt)
      });
    }

    fetchBlog();
  }, [blog, form]);

  const onFinish = async (values) => {
    // console.log("🚀 ~ file: index.jsx:39 ~ onFinish ~ imageFileList:", imageFileList)
    setIsSubmitLoading(true);
    await blogsApi.update(blogData?.id, {
      title: values.title,
      content: values.content,
      thumbnail: imageFileList?.[0]?.url
    }, true).then(() => {
      setTimeout(async () => {
        setIsSubmitLoading(false);
        setIsEdit(false)
        await refetchData();
        message.success("Sửa thành công")
        onClose();
        return;
      }, 1500)
    }).catch(e => {
      console.log(e);
      setIsSubmitLoading(false);
      return;
    })
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={756}
      destroyOnClose
      {...rest}
    >
      <div className="flex flex-col gap-4">
        <Form
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={"ID"}
            name={"id"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item
            label={"Tên Blog"}
            name={"title"}
          >
            <Input
              disabled={!isEdit}
            />
          </Form.Item>

          <Form.Item label="Ảnh thumbnail" >
            <UploadImages
              maxCount={1}
              fieldKey={'file'}
              disabled={!isEdit}
              defaultFileList={imageFileList}
              onUploadComplete={(fileList) => setImageFileList(fileList)}
            />
          </Form.Item>

          <Form.Item
            label={"Nội dung"}
            name={"content"}
          >
            <TextEditor
              contentValue={contentValue}
              setContentValue={setContentValue}
              readOnly={!isEdit}
            />
          </Form.Item>

          <Form.Item
            label={"Slug"}
            name={"slug"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item
            label={"Ngày tạo"}
            name={"createdAt"}
          >
            <Input
              disabled
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end w-full">
              {isEdit ? (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setIsEdit(false)}
                  >
                    Huỷ
                  </Button>

                  <Button
                    // onClick={() => setIsEdit(false)}
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitLoading}
                  >
                    Xác nhận
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEdit(true)}
                >
                  Sửa
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  )
}

export default ViewDrawerBlog