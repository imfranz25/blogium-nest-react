import { BounceLoader } from 'react-spinners';
import { LoaderWrapper } from './style';

const Loader = () => {
  return (
    <LoaderWrapper>
      <BounceLoader color="#87ceeb" size={100} aria-label="Loading posts" />
    </LoaderWrapper>
  );
};

export default Loader;
