import { classMap } from "@/constants/constant";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";

import "highlight.js/styles/github.css";

interface MarkDownProps {
  markdown: string;
}

hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);

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
