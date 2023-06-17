import { Form, Upload, Button } from 'antd';

interface FileUploaderProps {
  id: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ id }) => {
  return (
    <Form.Item name={id}>
      <Upload listType="picture" accept="image/png, image/jpeg" maxCount={1}>
        <Button>Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default FileUploader;
