type LoaderProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const defaultLoaderClass = 'loading loading-spinner';
const loaderSize = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
};

const Loader = ({ size = 'md' }: LoaderProps) => {
  return <span className={`${defaultLoaderClass} first-letter:${loaderSize[size]}`} />;
};

export default Loader;
