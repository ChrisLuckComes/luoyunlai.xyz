/* eslint-disable react/no-children-prop */
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function useMarkDown(markdown: string) {
  return (
    <Suspense fallback={<Spin indicator={<LoadingOutlined className="text-icon" spin />}></Spin>}>
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
    </Suspense>
  );
}
