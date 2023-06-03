import { Modal as AntdModal } from 'antd';

interface ModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  body: React.ReactNode;
  okLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isLoading,
  isOpen,
  onCancel,
  onSubmit,
  body,
  okLabel = 'Submit',
}) => {
  return (
    <AntdModal
      title="Title"
      open={isOpen}
      onOk={onSubmit}
      confirmLoading={isLoading}
      onCancel={onCancel}
      okText={okLabel}
    >
      {body}
    </AntdModal>
  );
};

export default Modal;
