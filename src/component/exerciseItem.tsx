import { classMap } from "@/constants/constant";
import { Toggle } from "./toggle";

interface ExerciseItemProps {
  id: string;
  name: string;
  source: { title: JSX.Element; content: JSX.Element };
  className?: string;
}

/**
 * @desc TS类型体操单项组件
 */
export const ExerciseItem = ({
  id,
  name,
  source,
  className = classMap.articleTitle
}: ExerciseItemProps) => {
  const { title, content } = source;
  return (
    <>
      <h2 id={id} className={className}>
        {name}
      </h2>
      {title}
      <Toggle content={content} />
    </>
  );
};
