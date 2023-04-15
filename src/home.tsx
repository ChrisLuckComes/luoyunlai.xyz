import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { request, cancel } from "@/tool/request";
import Styles from "./home.module.css";

const classMap = {
  home: "flex-center flex-col w-full h-full"
};

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["pnpm start\n", "console.log('分享前端方面的知识和经验')"],
      typeSpeed: 60
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className={classMap.home}>
      <div className={Styles["home"]}>
        <div className={Styles["title-bar"]}>Luoyunlai.top</div>
        <div className={Styles["text-body"]}>
          &nbsp;$&nbsp;<span ref={el}></span>
        </div>
      </div>
    </div>
  );
}
