import { classMap } from "@/constants/constant";
import React from "react";
// import { useMarkDown } from "@/hooks/useMarkdown";

export default function modernMode() {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>什么？creact-react-app也能用现代模式？</h1>
    </article>
  );
}
