import { classMap } from "@/constants/constant";
import React from "react";

export default function Index() {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>HTTP 2</h1>
    </article>
  );
}
