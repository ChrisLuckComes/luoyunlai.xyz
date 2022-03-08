import React, { lazy, ReactNode, Suspense } from "react";

/**
 *
 * @param componentPath 组件的路径
 * @param fallback 加载时显示的组件
 * @returns
 */
export function useLazyComponent(
  component: string | React.LazyExoticComponent<() => JSX.Element>,
  fallback: NonNullable<ReactNode> | null
) {
  const Element =
    component === "string" ? lazy(() => import(component)) : component;
  return (
    <Suspense fallback={fallback}>
      <Element />
    </Suspense>
  );
}
