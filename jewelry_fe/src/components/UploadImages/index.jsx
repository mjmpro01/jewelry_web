import { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Upload } from 'antd';
import urls from '../../constants/urls';

const UploadImages = (props) => {
  const { defaultFileList, onUploadComplete, fieldKey, maxCount, disabled, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  console.log("🚀 ~ file: index.jsx:10 ~ UploadImages ~ fileList:", fileList)

  useEffect(() => {
    if (defaultFileList) {
      setFileList(defaultFileList);
    }
  }, [defaultFileList]);

  const handleChange = (info) => {
    console.log("🚀 ~ file: index.jsx:18 ~ handleChange ~ info:", info)
    let updatedFileList = [...info.fileList];

    if (info.file.status === 'uploading') {
      setLoading(true);
      setFileList(updatedFileList);
    } else if (info.file.status === 'done') {
      setLoading(false);
      const fileUrl = info.file.response?.url; // Extract the file URL from the API response
      // Get this url from response in real world.
      if (fileUrl) {
        updatedFileList = updatedFileList.map(file => {
          if (file.uid === info.file.uid) {
            return {
              ...file,
              status: 'done',
              url: fileUrl || file.url || URL.createObjectURL(file.originFileObj)
            }
          }
          return file

        })
      }

      setFileList(updatedFileList);

      const imageUrls = updatedFileList.map(file => file.url || URL.createObjectURL(file.originFileObj));
      onUploadComplete?.(imageUrls);
    } else if (info.file.status === 'removed') {
      updatedFileList = updatedFileList.filter(file => file.uid !== info.file.uid); // Remove the deleted image URL
      onUploadComplete?.(updatedFileList.map(file => file.url)); // Pass updated array to parent
      setFileList(updatedFileList);
      return;
    }
  };

  const handleSuccess = (response, file) => {
    console.log("🚀 ~ file: index.jsx:54 ~ handleSuccess ~ response:", response)
    // Update the fileList when upload is successful
    const updatedFileList = fileList.map(f => (f.uid === file.uid ? { ...f, url: response.url, status: 'done' } : f))
    setFileList(updatedFileList);
    onUploadComplete?.(updatedFileList); // Pass updated array to parent
    setLoading(false);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name={fieldKey}
        listType="picture-card"
        className="avatar-uploader"
        fileList={fileList}
        action={`${urls.BASE_URL}/api/v1/${urls.UPLOAD}`}
        onChange={handleChange}
        onSuccess={handleSuccess}
        onError={(error) => {
          console.error("Upload error:", error);
        }}
        {...rest}
      >
        {!disabled && fileList?.length < (maxCount || Infinity) && uploadButton}
      </Upload>
    </Flex>
  );
};
export default UploadImages;