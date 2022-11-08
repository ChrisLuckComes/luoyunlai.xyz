/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkDownProps {
  markdown: string;
}

export function UseMarkDown({ markdown }: MarkDownProps) {
  return (
    <ReactMarkdown
      children={markdown}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return (
            <SyntaxHighlighter
              children={String(children)}
              style={materialDark}
              language={!inline && match ? match[1] : ''}
              PreTag="div"
              {...props}
            />
          );
        }
      }}
    ></ReactMarkdown>
  );
}
