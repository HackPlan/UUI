import React from 'react';
import classnames from 'classnames'
import { mapValues, pick, isString } from 'lodash';



export interface NodeCustomizeClassNameProps {
  className?: string
  overrideClassName?: string
  extendClassName?: string
}
export interface NodeCustomizeStyleProps {
  style?: React.CSSProperties
  overrideStyle?: React.CSSProperties
  extendStyle?: React.CSSProperties
}
export interface NodeCustomizeChildrenProps {
  children?: React.ReactNode
  overrideChildren?: React.ReactNode
  extendChildrenBefore?: React.ReactNode
  extendChildrenAfter?: React.ReactNode
}
export type NodeCustomizeProps =
  & NodeCustomizeClassNameProps
  & NodeCustomizeStyleProps
  & NodeCustomizeChildrenProps



function compileNodeName(nodeName: string, options?: { prefix?: string; separator?: string }) {
  return [options?.prefix, nodeName].filter((i) => i && i.length > 0).join(options?.separator || '-')
}
function getCompiledClassNames(nodeClassName: string, props?: NodeCustomizeClassNameProps): string {
  return props?.overrideClassName ? props?.overrideClassName : classnames(nodeClassName, props?.className || '', props?.extendClassName || '')
}
function getCompiledStyles(props?: NodeCustomizeStyleProps): React.CSSProperties {
  return props?.overrideStyle ? props?.overrideStyle : Object.assign(props?.style || {}, props?.extendStyle || {})
}
function getCompiledChildren(
  props?: NodeCustomizeChildrenProps,
): JSX.Element | null {
  if (props?.overrideChildren) {
    return <>{props?.overrideChildren}</>
  } else {
    return <>{props?.extendChildrenBefore} {props?.children} {props?.extendChildrenAfter}</>
  }
}



type IntrinsicNodeCustomizeProps =
  & NodeCustomizeClassNameProps
  & NodeCustomizeStyleProps
  & NodeCustomizeChildrenProps
type IntrinsicNodeCustomizeOptions =
  & IntrinsicNodeCustomizeProps
  & {
    prefix?: string
    separator?: string
  }

type IntrinsicNodeT = JSX.IntrinsicElements
type IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string | number | symbol> = (tagName: T, nodeName: N, options: IntrinsicNodeCustomizeOptions) => (props: JSX.IntrinsicElements[T]) => JSX.Element
function IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string>(tagName: T, nodeName: N, options: IntrinsicNodeCustomizeOptions) {
  return (_props: JSX.IntrinsicElements[T]) => {

    const className = (() => {
      return getCompiledClassNames(compileNodeName(nodeName, pick(options, ['prefix', 'separator'])), {
        ...pick(options, ['overrideClassName', 'extendClassName']),
        ...pick(_props, ['className']),
      })
    })()
    const style = (() => {
      return getCompiledStyles({
        ...pick(options, ['overrideStyle', 'extendStyle']),
        ...pick(_props, ['style']),
      })
    })()
    const children = (() => {
      const isInput = ['input'].indexOf(tagName) !== -1
      const isSelectOption = tagName === 'option'
      // input tag do not support to pass children props
      let children: string | React.ReactNode | undefined = undefined
      if (isSelectOption) {
        // select option tag only support string type children,
        // if pass Fragments to children, it will show [Object Object] in html.
        children = _props.children
      } else if (!isInput) {
        children = getCompiledChildren({
          ...pick(options, ['overrideChildren', 'extendChildrenBefore', 'extendChildrenAfter']),
          ...pick(_props, ['children']),
        })
      }
      return children
    })()

    return React.createElement(tagName, {
      ..._props,
      className, style, children,
    })
  }
}

type ComponentNodeCustomizeProps<M extends string> = {
  [key in M]: IntrinsicNodeCustomizeProps
}

type ComponentNodeT = (props: any, ...args: any) => any
type ComponentNode<P extends any, N extends string | number | symbol, M extends string> = (Target: React.ComponentType<P>, nodeName: N, customizeProps: ComponentNodeCustomizeProps<M>) => (props: P) => JSX.Element
function ComponentNode<P extends any, N extends string, M extends string>(Target: React.ComponentType<P>, nodeName: N, customizeProps: ComponentNodeCustomizeProps<M>) {
  return (_props: P) => (
    <Target
      {..._props}
      customize={customizeProps}
    />
  )
}

export class UUI {
  /**
   * UUI Advanced Component for Function Component
   * @param options setup options
   * @param WrappedComponent wrapped function component
   */
  static FunctionComponent<
    P, N extends string,
    T extends keyof IntrinsicNodeT | ComponentNodeT,
    X extends { [key in N]: T },
    Z extends {
      customize?: {
        [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
          ? NodeCustomizeProps
          : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
      }
    }
  >(
    options: {
      prefix: string
      name: string
      separator?: string
      nodes: X
    },
    WrappedComponent: (props: P, nodes: {
      [key in keyof X]: X[key] extends keyof IntrinsicNodeT
        ? ReturnType<IntrinsicNode<X[key], key>>
        : (X[key] extends ComponentNodeT ? ReturnType<ComponentNode<Parameters<X[key]>[0], key, any>> : never)
    }) => React.ReactElement,
  ) {
    return (props: P & Z) => {
      const nodes = compileNodes(props, options)
      return WrappedComponent(props, nodes)
    }
  }

  /**
   * UUI Advanced Component for Class Component
   * @param options setup options
   */
  static ClassComponent<
    N extends string,
    T extends keyof IntrinsicNodeT | ComponentNodeT,
    X extends { [key in N]: T },
    Z extends {
      customize?: {
        [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
          ? NodeCustomizeProps
          : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
      }
    }
  >(
    options: {
      prefix: string
      name: string
      separator?: string
      nodes: X
    },
  ) {

    return class WrappedComponent<P = {}, S = {}> extends React.Component<P, S> {
      nodes: {
        [key in keyof X]: X[key] extends keyof IntrinsicNodeT
          ? ReturnType<IntrinsicNode<X[key], key>>
          : (X[key] extends ComponentNodeT ? ReturnType<ComponentNode<Parameters<X[key]>[0], key, any>> : never)
      }

      constructor(props: P & Z) {
        super(props)
        this.nodes = compileNodes(props, options)
      }
    }
  }
}

function compileNodes(props: any, options: any): any {
  const prefix = `${options.prefix}-${options.name}`
  return mapValues(options.nodes, (value, key) => {
    const customizeProps = props.customize && (props.customize as any)[key]
    if (isString(value)) {
      return IntrinsicNode(value as any, key, {
        prefix, separator: options.separator,
        ...customizeProps,
      })
    } else {
      return ComponentNode(value as any, key, {
        ...customizeProps,
      })
    }
  })
}