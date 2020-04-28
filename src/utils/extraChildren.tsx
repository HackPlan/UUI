import React from 'react';

export type NodeExtraChildren<T extends string> = {
  [key in T | 'root']?: React.ReactNode
}

export interface ExtraChildrenProps<T extends string> {
  overrideChildren?: NodeExtraChildren<T>;
  extendChildrenBefore?: NodeExtraChildren<T>;
  extendChildrenAfter?: NodeExtraChildren<T>;
}

export function getCompiledChildren<T extends string>(
  nodeName: string,
  initialChildren?: any,
  options?: {
    overrideChildren?: NodeExtraChildren<T>;
    extendChildrenBefore?: NodeExtraChildren<T>;
    extendChildrenAfter?: NodeExtraChildren<T>;
  },
): JSX.Element {
  const keyName = nodeName === '' ? 'root' : nodeName;
  const override = (options && options.overrideChildren && (options.overrideChildren as any)[keyName]) || null
  const initial = initialChildren || null
  const extendBefore = (options && options.extendChildrenBefore && (options.extendChildrenBefore as any)[keyName]) || null
  const extendAfter = (options && options.extendChildrenAfter && (options.extendChildrenAfter as any)[keyName]) || null

  if (override) {
    return override
  } else {
    return (
      <>
        {extendBefore}
        {initial}
        {extendAfter}
      </>
    )
  }
}