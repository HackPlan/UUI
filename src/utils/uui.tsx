import React, { useMemo } from 'react';
import { mapValues, pick, isString, omit, merge, cloneDeep } from 'lodash';
import classNames from 'classnames';


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
  return props?.overrideClassName ? props?.overrideClassName : classNames(nodeClassName, props?.className || '', props?.extendClassName || '')
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
    return <>{props?.extendChildrenBefore}{props?.children}{props?.extendChildrenAfter}</>
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
  return React.forwardRef((_props: JSX.IntrinsicElements[T], ref) => {

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
      ...omit(_props, 'customize',
        'overrideClassName', 'extendClassName',
        'overrideStyle', 'extendStyle',
        'overrideChildren', 'extendChildrenBefore', 'extendChildrenAfter',
      ),
      ref,
      className, style, children,
    })
  })
}

type ComponentNodeCustomizeProps<M extends string | number | symbol> = {
  [key in M]: IntrinsicNodeCustomizeProps
}

type ComponentNodeT = (props: any, ...args: any) => any
type ComponentNode<P extends any, N extends string | number | symbol, M extends string | number | symbol> = (Target: React.ComponentType<P>, nodeName: N, customizeProps: ComponentNodeCustomizeProps<M>) => (props: P) => JSX.Element
function ComponentNode<P extends any, N extends string, M extends string>(Target: React.ComponentType<P>, nodeName: N, customizeProps: ComponentNodeCustomizeProps<M>) {
  const _Target = Target as any
  return React.forwardRef((_props: P & ComponentNodeCustomizeProps<M>, ref) => (
    <_Target
      {...omit(_props, 'customize')}
      ref={ref as any}
      customize={merge(_props.customize, customizeProps)}
    />
  ))
}

export type UUIComponentCustomizeProps<
  X extends { [key in string]?: keyof IntrinsicNodeT | ComponentNodeT }
> = {
  customize?: {
    [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
      ? NodeCustomizeProps
      : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
  }
}

export type UUIComponentNodes<
  X extends { [key in string]?: keyof IntrinsicNodeT | ComponentNodeT },
> = {
  [key in keyof X]: X[key] extends keyof IntrinsicNodeT
    ? ReturnType<IntrinsicNode<X[key], key>>
    : (X[key] extends ComponentNodeT ? ReturnType<ComponentNode<Parameters<X[key]>[0], key, any>> : never)
}

export type UUIConvenienceProps = {
  className?: string
  style?: React.CSSProperties
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
    /**
     * Do not replace these content with UUIComponentCustomizeProps<X>,
     * this is to allow developers to see detailed node type information when using this kind of component.
     */
    Z extends {
      customize?: {
        [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
          ? NodeCustomizeProps
          : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
      }
    }
  >(
    options: {
      prefix?: string
      name: string
      separator?: string
      nodes: X
    },
    WrappedComponent: (props: P, nodes: UUIComponentNodes<X>) => React.ReactElement,
  ) {
    return React.forwardRef((props: P & Z & UUIConvenienceProps, ref) => {
      const compiledProps = compileProps(props, options, ref)
      const nodes = useMemo(() => compileNodes(compiledProps, options), [])
      return WrappedComponent(compiledProps, nodes)
    })
  }

  /**
   * UUI Advanced Component for Class Component
   * @param options setup options
   */
  static ClassComponent<
    N extends string,
    T extends keyof IntrinsicNodeT | ComponentNodeT,
    X extends { [key in N]: T },
    /**
     * Do not replace these content with UUIComponentCustomizeProps<X>,
     * this is to allow developers to see detailed node type information when using this kind of component.
     */
    Z extends {
      customize?: {
        [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
          ? NodeCustomizeProps
          : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
      }
    }
  >(
    options: {
      prefix?: string
      name: string
      separator?: string
      nodes: X
    },
  ) {

    return class WrappedComponent<P = {}, S = {}> extends React.Component<P, S> {
      nodes: UUIComponentNodes<X>

      constructor(props: P & Z) {
        super(props)
        const compiledProps = compileProps(props, options, (props as any).innerRef || undefined)
        this.nodes = compileNodes(compiledProps, options)
      }
    }
  }
}

function compileProps(props: any, options: any, ref: any): any {
  /**
   * Convenience props: className, style
   * className will be injected into customize.Root { extendClassName: ... }
   * style will be injected into customize.Root { extendStyle: ... }
   */
  const compiledProps = cloneDeep(props)
  if (
    (options.nodes as any)['Root'] && isString((options.nodes as any)['Root']) &&
    (compiledProps.className || compiledProps.style)
  ) {
    if (!compiledProps.customize) {
      compiledProps.customize = {}
    }
    const rootCustomizeProps: NodeCustomizeProps = {}
    if (compiledProps.className) rootCustomizeProps.extendClassName = classNames(rootCustomizeProps.extendClassName, compiledProps.className)
    if (compiledProps.style) rootCustomizeProps.extendStyle = Object.assign(compiledProps.style, rootCustomizeProps.extendStyle) as any
    (compiledProps.customize as any)['Root'] = rootCustomizeProps
  }
  compiledProps.ref = ref

  return  compiledProps
}

function compileNodes(props: any, options: any): any {
  const prefix = `${options.prefix || 'UUI'}-${options.name}`
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