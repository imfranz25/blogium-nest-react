import { Form, Upload, Button } from 'antd';

interface FileUploaderProps {
  id: string;
  disable?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ id, disable = false }) => {
  return (
    <Form.Item name={id}>
      <Upload listType="picture" accept="image/png, image/jpeg" disabled={disable} maxCount={1}>
        <Button disabled={disable}>Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default FileUploader;
