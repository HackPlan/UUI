import React from 'react';
import classnames from 'classnames';
import { NodeExtraClassNames, getCompiledClassNames, ExtraClassNameProps } from './extraClassName';
import { NodeExtraStyles, getCompiledStyles, ExtraStyleProps } from './extraStyle';
import { getCompiledChildren, NodeExtraChildren, ExtraChildrenProps } from './extraChildren';

export type StylishProps<T extends string> = ExtraClassNameProps<T> & ExtraStyleProps<T> & ExtraChildrenProps<T>

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

export function initStylished<T extends string>(
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
  return {
    element: (tagName: string, nodeName: string) => {
      const Tag = tagName as 'div'
      return (_props: React.HTMLAttributes<HTMLOrSVGElement>) => {
        return (
          <Tag
            {..._props}
            className={getCompiledClassNames<T>(nodeName, compileNodeName([rootNodeName, nodeName], options), _props.className, props)}
            style={getCompiledStyles<T>(nodeName, _props.style, props)}
            children={getCompiledChildren<T>(nodeName, _props.children, props)}
          />
        )
      }
    },
    component: <P extends any>(Target: React.ComponentType<P>, nodeName: string) => {
      return (_props: P) => {
        return (
          <Target
            {..._props}
            className={getCompiledClassNames<T>(nodeName, compileNodeName([rootNodeName, nodeName], options), _props.className, props)}
            style={getCompiledStyles<T>(nodeName, _props.style, props)}
            children={getCompiledChildren<T>(nodeName, _props.children, props)}
          />
        )
      }
    },
  }
}
