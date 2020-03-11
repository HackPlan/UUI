import React from 'react';
import classnames from 'classnames';
import { NodeExtraClassNames, getCompiledClassNames, ExtraClassNameProps } from './extraClassName';
import { NodeExtraStyles, getCompiledStyles, ExtraStyleProps } from './extraStyle';
import { getCompiledChildren, NodeExtraChildren, ExtraChildrenProps } from './extraChildren';

function compileNodeName(nodeNames: (string | undefined)[], options?: {
  prefix?: string,
  separator?: string,
}) {
  return [options?.prefix, ...nodeNames].filter((i) => i && i.length > 0).join(options?.separator || '-')
}

export function initStylish<T extends string>(
  rootNodeName: string,
  props?: {
    overrideClassName?: NodeExtraClassNames<T>,
    extendClassName?: NodeExtraClassNames<T>,

    overrideStyle?: NodeExtraStyles<T>,
    extendStyle?: NodeExtraStyles<T>,

    overrideChildren?: NodeExtraChildren<T>,
    extendChildrenBefore?: NodeExtraChildren<T>,
    extendChildrenAfter?: NodeExtraChildren<T>,
  },
  options?: {
    prefix?: string,
    separator?: string,
  }
) {
  return (
    nodeName: string,
    classNames: (string | undefined)[] = [],
    style: React.CSSProperties = {},
    children?: React.ReactNode,
  ) => {
    return {
      className: getCompiledClassNames<T>(nodeName, compileNodeName([rootNodeName, nodeName], options), classnames(classNames), props),
      style: getCompiledStyles<T>(nodeName, style, props),
      children: getCompiledChildren<T>(nodeName, children, props),
    }
  }
}

export type StylishProps<T extends string> = ExtraClassNameProps<T> & ExtraStyleProps<T> & ExtraChildrenProps<T>