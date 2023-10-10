export const getOptimizedImageURL = ({
  url,
  width,
  height,
}: {
  url: string;
  width: number;
  height: number;
}) => {
  const target = '/upload';

  // 'target'이 시작하는 인덱스를 찾습니다.
  let index = url.indexOf(target);

  if (index !== -1) {
    index += target.length;
    return url.slice(0, index) + getSizeURL({ width, height }) + url.slice(index);
  }
  return url;
};

const getSizeURL = ({ width, height }: { width: number; height: number }) => {
  if (width && height) {
    return `/w_${width},h_${height}`;
  }
  if (!width && !height) {
    return '';
  }
  if (width) {
    return `w_${width}`;
  }
  return `h_${height}`;
};
