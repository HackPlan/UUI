import React from 'react';
import classNames from "classnames"
import { mergeWith } from 'lodash-es';
import { ComponentNodeCustomizeProps, IntrinsicNodeCustomizeProps } from '../modules/UUICustomizeNode';

export function mergeCustomize<M extends string>(...customizes: Array<ComponentNodeCustomizeProps<M> | undefined>): ComponentNodeCustomizeProps<M> | undefined {
  const mergedCustomize: any = {}

  const customizer = (c1: IntrinsicNodeCustomizeProps | undefined, c2: IntrinsicNodeCustomizeProps) => {
    if (c1 === undefined) return c2
    return {
      ...c1,
      ...c2,
      extendClassName: classNames(c1.extendClassName, c2.extendClassName),
      extendChildrenBefore: <>{c1.extendChildrenBefore || null}{c2.extendChildrenBefore || null}</>,
      extendChildrenAfter: <>{c1.extendChildrenAfter || null}{c2.extendChildrenAfter || null}</>,
      extendStyle: {
        ...c1.extendStyle || {},
        ...c2.extendStyle || {},
      }
    }
  }

  for (const customize of customizes) {
    mergeWith(mergedCustomize, customize, customizer)
  }

  return mergedCustomize
}