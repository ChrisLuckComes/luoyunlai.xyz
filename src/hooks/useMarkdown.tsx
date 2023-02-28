// /* eslint-disable react/no-children-prop */
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { classMap } from '@/constants/constant';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/github.css';

interface MarkDownProps {
  markdown: string;
}

export function UseMarkDown({ markdown }: MarkDownProps) {
  const md = MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
          } catch (e) {}
        }

        return '';
      }
    }),
    result = md.render(markdown);

  return <div className={classMap.markdown} dangerouslySetInnerHTML={{ __html: result }}></div>;
}
