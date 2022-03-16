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
      <h1 className={classMap.pageTitle}>来不及了，快上车tailwindcss</h1>
    </article>
  );
}
