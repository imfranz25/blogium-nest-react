import { Modal as AntdModal } from 'antd';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onOk?: () => void;
  isLoading: boolean;
  closable?: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isLoading,
  isOpen,
  onCancel,
  children,
  closable,
  onOk,
}) => {
  return (
    <AntdModal
      onOk={onOk}
      open={isOpen}
      title={title}
      onCancel={onCancel}
      closable={closable}
      confirmLoading={isLoading}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
