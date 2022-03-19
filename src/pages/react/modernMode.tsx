import React from "react";
// import { useMarkDown } from "@/hooks/useMarkdown";

const classMap = {
  pageTitle: "page-title",
  article: "article",
  articleTitle: "article-title",
  href: "href",
  ul: "ul",
  assist: "assist",
};

export default function modernMode() {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>什么？creact-react-app也能用现代模式？</h1>
    </article>
  );
}
