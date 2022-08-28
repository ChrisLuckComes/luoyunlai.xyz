import { classMap } from "@/constants/constant";
import React from "react";

export default function Cloud() {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>作为一个前端好意思说没有个人网站？</h1>
      <h2 className={classMap.articleTitle}>前言</h2>
      <p>
        几年之前小打小闹弄了个没营养的
        <a
          className={classMap.assist}
          href="https://chrisluckcomes.github.io/realBlog/"
        >
          博客
        </a>
        托管在Github Pages上，只能说有了，缺点如下：
      </p>
      <ul className={classMap.ul}>
        <li>域名相对固定，只有前缀可以自定义</li>
        <li>
          <strong>
            毕竟是来自于GitHub的服务，访问不稳定，速度感人，时不时根本访问不了你懂的
          </strong>
        </li>
      </ul>
    </article>
  );
}
