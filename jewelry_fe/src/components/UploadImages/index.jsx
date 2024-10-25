import { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Image, Upload } from 'antd';
import urls from '../../constants/urls';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = (props) => {
  const { defaultFileList, onUploadComplete, fieldKey, maxCount, disabled, ...rest } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (defaultFileList) {
      setFileList(defaultFileList);
    }
  }, [defaultFileList]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setLoading(true);

    setFileList(newFileList)

    onUploadComplete?.(newFileList); // Pass updated array to parent

    setLoading(false);
  };

  const handleSuccess = (response, file) => {
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
        onPreview={handlePreview}
        onChange={handleChange}
        onSuccess={handleSuccess}
        onError={(error) => {
          console.error("Upload error:", error);
        }}
        onRemove={(file) => console.log(file)}
        showUploadList={{ showRemoveIcon: !disabled }}
        {...rest}
      >
        {!disabled && fileList?.length < (maxCount || Infinity) && uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </Flex>
  );
};
export default UploadImages;