import { CaretRightOutlined } from "@ant-design/icons";
import { ReactNode, useMemo, useState } from "react";

interface ToggleProps {
  content: JSX.Element;
  message?: string;
}

export function Toggle({ content, message = "查看答案" }: ToggleProps) {
  const [visible, setVisible] = useState(false);

  const rotate = useMemo(() => (visible ? 90 : 0), [visible]);

  return (
    <div className="transition-all my-10">
      <div
        className="cursor-pointer text-blue text-16"
        onClick={() => setVisible((prev) => !prev)}
      >
        <CaretRightOutlined rotate={rotate} /> {message}：
      </div>
      <div>{visible && content}</div>
    </div>
  );
}
