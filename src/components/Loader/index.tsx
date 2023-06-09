import { PuffLoader } from 'react-spinners';
import { LoaderWrapper } from './style';

const Loader = () => {
  return (
    <LoaderWrapper>
      <PuffLoader color="#87ceeb" size={100} aria-label="Loading posts" />
    </LoaderWrapper>
  );
};

export default Loader;
