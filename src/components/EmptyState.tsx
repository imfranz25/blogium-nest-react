import React from 'react';
import { Row, Typography } from 'antd';

interface EmptyStateProps {
  label: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ label }) => {
  return (
    <Row justify="center">
      <Typography.Title style={{ color: 'rgba(0,0,0,.3)' }}>{label}</Typography.Title>
    </Row>
  );
};

export default EmptyState;
