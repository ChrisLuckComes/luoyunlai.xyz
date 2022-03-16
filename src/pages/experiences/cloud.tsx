import React from "react";
import { useMarkDown } from "@/hooks/useMarkdown";

const classMap = {
  pageTitle: "page-title",
  article: "article",
  articleTitle: "article-title",
  href: "href",
  ul: "ul",
  assist: "assist",
};

export default function () {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>作为一个前端好意思说没有个人网站？</h1>
    </article>
  );
}
