import React from 'react';
import classNames from "classnames"
import { mergeWith } from 'lodash-es';
import { ComponentNodeCustomizeProps, IntrinsicNodeCustomizeProps } from '../modules/UUICustomizeNode';

export function mergeCustomize<M extends string>(...customizes: Array<ComponentNodeCustomizeProps<M> | undefined>): ComponentNodeCustomizeProps<M> | undefined {
  const mergedCustomize: any = {}

  const customizer = (c1: IntrinsicNodeCustomizeProps | undefined, c2: IntrinsicNodeCustomizeProps) => {
    if (c1 === undefined) return c2

    const result = {
      ...c1,
      ...c2,
    }

    if (c1.extendClassName && c2.extendClassName) {
      result.extendClassName = classNames(c1.extendClassName, c2.extendClassName)
    }
    if (c1.extendStyle && c2.extendStyle) {
      result.extendStyle = { ...c1.extendStyle, ...c2.extendStyle }
    }
    if (c1.extendChildrenBefore && c2.extendChildrenBefore) {
      result.extendChildrenBefore = <>{c1.extendChildrenBefore}{c2.extendChildrenBefore}</>
    }
    if (c1.extendChildrenAfter && c2.extendChildrenAfter) {
      result.extendChildrenAfter = <>{c1.extendChildrenAfter}{c2.extendChildrenAfter}</>
    }

    return result
  }

  for (const customize of customizes) {
    mergeWith(mergedCustomize, customize, customizer)
  }

  return mergedCustomize
}