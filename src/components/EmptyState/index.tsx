import { Row } from 'antd';

interface EmptyStateProps {
  label: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ label }) => {
  return <Row justify="center">{label}</Row>;
};

export default EmptyState;
