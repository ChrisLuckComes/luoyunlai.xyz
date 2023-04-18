import { classMap } from "@/constants/constant";
import { Anchor } from "antd";
import { UseMarkDown } from "@/hooks/useMarkdown";
const { Link } = Anchor;

export default function VsCodeExtension() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="diff" className={classMap.articleTitle}>
          第一个VSCode插件
        </h2>
      </main>
    </article>
  );
}
