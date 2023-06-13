import { Modal as AntdModal } from 'antd';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  closable?: boolean;
  children?: React.ReactNode;
  onOk?: () => void;
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
      title={title}
      open={isOpen}
      confirmLoading={isLoading}
      onCancel={onCancel}
      closable={closable}
      onOk={onOk}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
