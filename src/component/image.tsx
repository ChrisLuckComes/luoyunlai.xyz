import { useLayoutEffect, useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface ImageProps {
  src: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
}

export const LazyImage = ({ src, title, width, height, className, alt }: ImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [imgSrc, setImgSrc] = useState('');

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (imgSrc || entries[0].intersectionRatio <= 0) {
        return;
      } else {
        setImgSrc(src);
      }
    });
    if (ref?.current) {
      observer.observe(ref?.current as HTMLImageElement);
    }
  }, []);

  return (
    <div ref={ref}>
      {imgSrc ? (
        <img
          className={className ?? ''}
          width={width ?? ''}
          height={height ?? ''}
          src={imgSrc}
          title={title ?? ''}
          alt={alt ?? ''}
        ></img>
      ) : (
        <Spin indicator={<LoadingOutlined className="text-icon" spin />}></Spin>
      )}
    </div>
  );
};
