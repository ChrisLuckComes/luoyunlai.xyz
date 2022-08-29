declare module '*.md' {
  // When "Mode.HTML" is requested
  const html: string;
  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  import React from 'react';
  const ReactComponent: React.VFC;
  export { html };
}
declare module '*.webp';
declare module '*.gif';
declare module '*.png';
declare module '*.mdx';
