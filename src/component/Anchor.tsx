import { Anchor } from "antd";
import { AnchorLinkItemProps } from "antd/es/anchor/Anchor";

interface AnchorProps {
  items: AnchorLinkItemProps[];
}

/**
 * @desc 导航组件
 * @param items;
 * @returns JSX.Element
 */
export const ArticleAnchor = ({ items }: AnchorProps) => (
  <Anchor
    className="h-full overflow-y-auto"
    getContainer={() => document.querySelector(".article") as HTMLElement}
    items={items}
    targetOffset={0}
  ></Anchor>
);
