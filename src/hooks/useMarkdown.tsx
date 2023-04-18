import { classMap } from "@/constants/constant";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import "highlight.js/styles/github.css";

interface MarkDownProps {
  markdown: string;
}

/**
 * @desc markdown转jsx
 * @param param0
 * @returns
 */
export function UseMarkDown({ markdown }: MarkDownProps) {
  const md = MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value;
          } catch (e) {}
        }

        return "";
      }
    }),
    result = md.render(markdown);

  return (
    <div
      className={classMap.markdown}
      dangerouslySetInnerHTML={{ __html: result }}
    ></div>
  );
}
