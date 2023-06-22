import { PuffLoader } from 'react-spinners';
import { LoaderWrapper } from './style';

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 100 }) => {
  return (
    <LoaderWrapper style={{ height: `${size === 50 ? '20vh' : '100vh'}` }}>
      <PuffLoader color="#87ceeb" size={size} aria-label="Loading posts" />
    </LoaderWrapper>
  );
};

export default Loader;
