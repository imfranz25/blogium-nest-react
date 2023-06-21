import toast from 'react-hot-toast';
import { useState } from 'react';
import { Upload, Row } from 'antd';
import { BsUpload } from 'react-icons/bs';

import { FormInstance } from 'antd/es/form';
import { AvatarPreview, Avatar, UploadButton } from './styles';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

interface FileUploaderProps {
  id: string;
  disable?: boolean;
  defaultImg?: string;
  form: FormInstance;
  preview?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  form,
  id,
  defaultImg = '',
  disable = false,
  preview = '?',
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImg);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      toast.error('Image must be smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const fileObj = info.file.originFileObj as RcFile;

    /* Error upon uploading */
    if (!fileObj) {
      return;
    }

    getBase64(fileObj, (url) => {
      setImageUrl(url);
      form.setFieldValue(id, url);
    });
  };

  return (
    <Row justify="center">
      <AvatarPreview justify="center">
        <Avatar src={imageUrl} size={150}>
          <span>{preview[0].toUpperCase()}</span>
        </Avatar>
      </AvatarPreview>
      <Row justify="center">
        <Upload
          listType="picture"
          accept="image/png, image/jpeg, image/jpg"
          className="avatar-uploader"
          showUploadList={false}
          disabled={disable}
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={() => false}
        >
          <UploadButton style={{ marginTop: '15px' }} disabled={disable} icon={<BsUpload />}>
            Upload
          </UploadButton>
        </Upload>
      </Row>
    </Row>
  );
};

export default FileUploader;
