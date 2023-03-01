import { UpSquareFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './backTop.css';

export default function BackTop() {
  const [visible, setVisible] = useState(false);

  const [scrollDom, setScrollDom] = useState<HTMLDivElement>();

  const showIcon = (e: any) => {
    let top = e?.target?.scrollTop;
    setVisible(top > 20);
  };

  const goTop = () => {
    if (scrollDom) {
      let distance = scrollDom.scrollTop;
      let backTop = () => {
        scrollDom.scrollTop = distance -= 36;
        if (distance > 0) {
          requestAnimationFrame(backTop);
        } else {
          scrollDom.scrollTop = 0;
        }
      };
      requestAnimationFrame(backTop);
    }
  };

  useEffect(() => {
    let root = document.getElementById('rootActicle') as HTMLDivElement;
    if (root) {
      setScrollDom(root);
      root.addEventListener('scroll', showIcon, true);
    }

    return () => {
      scrollDom?.removeEventListener('scroll', showIcon, true);
    };
  }, []);

  return (
    <UpSquareFilled
      className="absolute back-top bottom-72 right-72"
      style={{ visibility: visible ? 'visible' : 'hidden' }}
      onClick={goTop}
    ></UpSquareFilled>
  );
}
