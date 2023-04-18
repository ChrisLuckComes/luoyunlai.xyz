import { UpSquareFilled } from "@ant-design/icons";
import { useLayoutEffect, useState } from "react";
import "./backTop.css";
import { useLocation } from "react-router-dom";

export default function BackTop() {
  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();

  const [scrollDom, setScrollDom] = useState<HTMLElement>();

  const showIcon = (e: Event) => {
    let top = (e.target as HTMLElement).scrollTop;
    setVisible(top > 20);
  };

  const goTop = () => {
    if (scrollDom) {
      let distance = scrollDom.scrollTop;
      let backTop = () => {
        scrollDom.scrollTop = distance -= 100;
        if (distance > 0) {
          requestAnimationFrame(backTop);
        } else {
          scrollDom.scrollTop = 0;
        }
      };
      requestAnimationFrame(backTop);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      let root = document.getElementById("rootArticle")!;
      setScrollDom(root);
      root.addEventListener("scroll", showIcon, true);
    }, 1000);

    return () => {
      scrollDom?.removeEventListener("scroll", showIcon, true);
    };
  }, [pathname]);

  return (
    <UpSquareFilled
      className="block absolute z-[11] back-top bottom-48 right-48"
      style={{ visibility: visible ? "visible" : "hidden" }}
      onClick={goTop}
    ></UpSquareFilled>
  );
}
