import { classMap } from '@/constants/constant';
import React from 'react';

export default function modernMode() {
  return (
    <article className={classMap.article}>
      <h1 className={classMap.pageTitle}>2022年还在用webpack?快上Vite！</h1>
    </article>
  );
}
