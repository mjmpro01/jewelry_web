import { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Upload } from 'antd';
import urls from '../../constants/urls';

const UploadImages = (props) => {
  const { defaultFileList, onUploadComplete, fieldKey, maxCount, disabled, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  console.log("🚀 ~ file: index.jsx:9 ~ UploadImages ~ fileList:", fileList)

  useEffect(() => {
    if (defaultFileList) {
      setFileList(defaultFileList);
    }
  }, [defaultFileList]);

  const handleChange = (info) => {
    let updatedFileList = [...info.fileList];

    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const fileUrl = info.file.response?.url; // Extract the file URL from the API response
      // Get this url from response in real world.
      if (fileUrl) {
        updatedFileList = updatedFileList.map(file => {
          if (file.uid === info.file.uid) {
            return {
              ...file,
              url: fileUrl
            }
          }
          return file

        })
      }
    } else if (info.file.status === 'removed') {
      updatedFileList = updatedFileList.filter(file => file.uid !== info.file.uid); // Remove the deleted image URL
      onUploadComplete?.(updatedFileList.map(file => file.url)); // Pass updated array to parent
      setFileList(updatedFileList);
      return;
    }

    setFileList(updatedFileList);

    const imageUrls = updatedFileList.map(file => file.url || file.thumbUrl);
    onUploadComplete?.(imageUrls);
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
        {...rest}
      >
        {!disabled && fileList?.length < (maxCount || Infinity) && uploadButton}
      </Upload>
    </Flex>
  );
};
export default UploadImages;