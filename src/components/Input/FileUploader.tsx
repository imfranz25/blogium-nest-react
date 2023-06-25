import { Upload, Row } from 'antd';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { BsUpload } from 'react-icons/bs';

import { FormInstance } from 'antd/es/form';
import { validImgFormats } from '../../constants';
import { AvatarPreview, Avatar, UploadButton } from './styles';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

interface FileUploaderProps {
  id: string;
  preview?: string;
  disable?: boolean;
  form: FormInstance;
  defaultImg?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  form,
  id,
  preview = '?',
  defaultImg = '',
  disable = false,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImg);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 2; // 2MB
    const isValidImg = validImgFormats.includes(file.type);

    if (!isValidImg) {
      toast.error('You can only upload JPG/PNG file!');
      return false;
    }

    if (!isLt2M) {
      toast.error('Image must be smaller than 2MB!');
      return false;
    }

    return isValidImg && isLt2M;
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
          maxCount={1}
          listType="picture"
          showUploadList={false}
          disabled={disable}
          onChange={handleChange}
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          customRequest={() => false}
          accept="image/png, image/jpeg, image/jpg"
        >
          <UploadButton disabled={disable} icon={<BsUpload />}>
            Upload
          </UploadButton>
        </Upload>
      </Row>
    </Row>
  );
};

const MemoizedFileUploader = React.memo(FileUploader);

export default MemoizedFileUploader;
