import { Modal as AntdModal } from 'antd';

interface ModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  body: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isLoading, isOpen, onCancel, onSubmit, body }) => {
  return (
    <AntdModal
      title="Title"
      open={isOpen}
      onOk={onSubmit}
      confirmLoading={isLoading}
      onCancel={onCancel}
    >
      {body}
    </AntdModal>
  );
};

export default Modal;
