/**
 * UUI Core Component Util
 *
 * this file provides multiple utils for building powerful uui components.
 * Any component built using this tool supports custom styles,
 * which means you can modify className, style and even children of nodes in the component.
 */


import React, { JSXElementConstructor } from 'react';
import { mapValues, pick, isString, omit, merge, clone, uniq } from 'lodash';
import classNames from 'classnames';


export interface NodeCustomizeClassNameProps {
  className?: string;
  overrideClassName?: string;
  extendClassName?: string;
}
export interface NodeCustomizeStyleProps {
  style?: React.CSSProperties;
  overrideStyle?: React.CSSProperties;
  extendStyle?: React.CSSProperties;
}
export interface NodeCustomizeChildrenProps {
  children?: React.ReactNode;
  overrideChildren?: React.ReactNode;
  extendChildrenBefore?: React.ReactNode;
  extendChildrenAfter?: React.ReactNode;
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
type IntrinsicNodeCustomizeOptions= {
  prefix?: string;
  separator?: string;
}

export type IntrinsicNodeT = JSX.IntrinsicElements
type IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string | number | symbol> = (tagName: T, nodeName: N, options: IntrinsicNodeCustomizeOptions) => (props: JSX.IntrinsicElements[T]) => JSX.Element
function IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string>(tagName: T, nodeName: N, options: IntrinsicNodeCustomizeOptions) {
  const Node = React.forwardRef((_props: JSX.IntrinsicElements[T], _ref) => {
    const customizeProps = (Node as any)['CustomizeProps'] as { customize?: ComponentNodeCustomizeProps<N> } & UUIConvenienceProps
    const className = (() => {
      return getCompiledClassNames(compileNodeName(nodeName, pick(options, ['prefix', 'separator'])), {
        ...pick(customizeProps.customize, ['overrideClassName', 'extendClassName']),
        ...pick(_props, ['className']),
      })
    })()
    const style = (() => {
      return getCompiledStyles({
        ...pick(customizeProps.customize, ['overrideStyle', 'extendStyle']),
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
          ...pick(customizeProps.customize, ['overrideChildren', 'extendChildrenBefore', 'extendChildrenAfter']),
          ...pick(_props, ['children']),
        })
      }
      return children
    })()

    const ref = customizeProps.customize && (customizeProps.customize as any).ref ? (customizeProps.customize as any).ref : _ref

    /**
     * Merge both customize functions and component inner functions.
     */
    const mergedFunctions = (() => {
      const data: any = {}
      const attrs = uniq([
        ...Object.keys(_props),
        ...Object.keys(customizeProps.customize || {}),
      ])
      for (const attr of attrs) {
        if (
          attr.startsWith('on') &&
          (typeof (_props as any)[attr] === 'function') ||
          (customizeProps.customize && typeof (customizeProps.customize as any)[attr] === 'function')
        ) {
          data[attr] = (...args: any[]) => {
            if ((_props as any)[attr]) {
              (_props as any)[attr](...args);
            }
            if (customizeProps.customize && (customizeProps.customize as any)[attr]) {
              (customizeProps.customize as any)[attr](...args);
            }
          };
        }
      }
      return data
    })()

    return React.createElement(tagName, {
      ...omit(_props, 'children'),
      ...omit(customizeProps.customize,
        'ref',
        'overrideClassName', 'extendClassName',
        'overrideStyle', 'extendStyle',
        'overrideChildren', 'extendChildrenBefore', 'extendChildrenAfter',
      ),
      ...mergedFunctions,
      ref,
      className, style,
    }, children)
  })
  return Node
}

type ComponentNodeCustomizeProps<M extends string | number | symbol> = {
  [key in M]: IntrinsicNodeCustomizeProps
}
type ComponentNodeCustomizeOptions= {
  prefix?: string;
  separator?: string;
}

export type ComponentNodeT = (props: any, ...args: any) => any
type ComponentNode<P extends any, N extends string | number | symbol, M extends string | number | symbol> = (Target: React.ComponentType<P>, nodeName: N, options: ComponentNodeCustomizeOptions) => (props: P) => JSX.Element
function ComponentNode<P extends any, N extends string, M extends string>(Target: React.ComponentType<P>, nodeName: N, options: ComponentNodeCustomizeOptions) {
  const _Target = Target as any
  const Node = React.forwardRef((_props: P & ComponentNodeCustomizeProps<M>, ref) => {
    const customizeProps = (Node as any)['CustomizeProps'] as { customize?: ComponentNodeCustomizeProps<M> } & UUIConvenienceProps
    const nodeClassName = [options.prefix, nodeName].join(options.separator)

    return <_Target
      {...omit(_props, 'customize')}
      ref={ref as any}
      className={classNames(nodeClassName, _props.className, customizeProps.className)}
      customize={merge(_props.customize, customizeProps.customize)}
    />
  })
  return Node
}

export type UUIComponentCustomizeProps<
  X extends { [key in string]?: keyof IntrinsicNodeT | ComponentNodeT }
> = {
  customize?: {
    [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
      ? NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>
      : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
  };
}

export type UUIComponentNodes<
  X extends { [key in string]?: keyof IntrinsicNodeT | ComponentNodeT },
> = {
  [key in keyof X]: X[key] extends keyof IntrinsicNodeT
    ? ReturnType<IntrinsicNode<X[key], key>>
    : (X[key] extends ComponentNodeT ? ReturnType<ComponentNode<Parameters<X[key]>[0], key, any>> : never)
}

export type UUIConvenienceProps = {
  /**
   * Convenience className props,
   * this props will be applied to append to extendClassName of component Root node customize props.
   * @default none
   */
  className?: string;
  /**
   * Convenience style props,
   * this props will be applied to merge to extendStyle of component Root node customize props.
   * @default none
   */
  style?: React.CSSProperties;
}

export type UUIFunctionComponentProps<T extends (...args: any) => any> = Parameters<T>[0]
export type UUIClassComponentProps<T extends JSXElementConstructor<any>> = React.ComponentProps<T>

export abstract class UUI {
  /**
   * UUI Advanced Component for Function Component
   * @param options setup options
   * @param WrappedComponent wrapped function component
   */
  static FunctionComponent<
    /**
     * Generic type P for target component props
     */
    P,
    /**
     * Generic type N for component node name
     */
    N extends string,
    /**
     * Generic type T for options.nodes value
     */
    T extends keyof IntrinsicNodeT | ComponentNodeT,
    /**
     * Generic type X for WrappedComponent generated nodes
     */
    X extends { [key in N]: T },
    /**
     * Generic type Z for component props.customize
     *
     * Do not replace these content with UUIComponentCustomizeProps<X>,
     * this is to allow developers to see detailed node type information when using this kind of component.
     */
    Z extends {
      /**
       * Customize component nodes
       * @default none
       */
      customize?: {
        [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
          ? NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>
          : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
      };
    }
  >(
    options: {
      prefix?: string;
      name: string;
      separator?: string;
      nodes: X;
    },
    WrappedComponent: (props: P, nodes: UUIComponentNodes<X>) => React.ReactElement,
  ) {
    const nodes = compileNodes(options)
    return (props: P & UUIConvenienceProps & Z) => {
      const compiledProps = compileProps(props, options, undefined)
      injectCustomizeProps(nodes, compiledProps)
      return WrappedComponent(compiledProps, nodes)
    }
  }

  /**
   * UUI Advanced Component for Class Component
   * @param options setup options
   */
  static ClassComponent<
    /**
     * Generic type N for component node name
     */
    N extends string,
    /**
     * Generic type T for options.nodes value
     */
    T extends keyof IntrinsicNodeT | ComponentNodeT,
    /**
     * Generic type X for WrappedComponent generated nodes
     */
    X extends { [key in N]: T },
    /**
     * Generic type Z for component props.customize
     *
     * Do not replace these content with UUIComponentCustomizeProps<X>,
     * this is to allow developers to see detailed node type information when using this kind of component.
     */
    Z extends {
      /**
       * Customize component nodes
       * @default none
       */
      customize?: {
        [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
          ? NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>
          : (X[key] extends ComponentNodeT ? NonNullable<Parameters<X[key]>[0]['customize']> : never)
      };
    }
  >(
    options: {
      prefix?: string;
      name: string;
      separator?: string;
      nodes: X;
    },
  ) {
    const nodes = compileNodes(options)
    return class WrappedComponent<P = {}, S = {}> extends React.Component<P & UUIConvenienceProps & Z, S> {
      nodes: UUIComponentNodes<X>
      constructor(props: P & UUIConvenienceProps & Z) {
        super(props)
        const compiledProps = compileProps(props, options, (props as any).innerRef || undefined)
        injectCustomizeProps(nodes, compiledProps)
        this.nodes = nodes
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
  const compiledProps = clone(props)
  if (
    (options.nodes as any)['Root'] && isString((options.nodes as any)['Root']) &&
    (compiledProps.className || compiledProps.style)
  ) {
    if (!compiledProps.customize) {
      compiledProps.customize = {}
    }
    const rootCustomizeProps: any = (compiledProps.customize as any)['Root'] || {};
    if (compiledProps.className) rootCustomizeProps.extendClassName = classNames(compiledProps.className, rootCustomizeProps.extendClassName);
    if (compiledProps.style) rootCustomizeProps.extendStyle = Object.assign(compiledProps.style, rootCustomizeProps.extendStyle) as any;
    (compiledProps.customize as any)['Root'] = rootCustomizeProps;
  }
  compiledProps.ref = ref

  return  compiledProps
}

function compileNodes(options: any): any {
  const separator = options.separator || '-'
  const prefix = [options.prefix || 'UUI', options.name].join(separator)
  return mapValues(options.nodes, (nodeElement, nodeName) => {
    if (isString(nodeElement)) {
      return IntrinsicNode(nodeElement as any, nodeName, { prefix, separator })
    } else {
      return ComponentNode(nodeElement as any, nodeName, { prefix, separator })
    }
  })
}

function injectCustomizeProps(nodes: any, props: any) {
  for (const nodeName of Object.keys(nodes)) {
    const customizeProps = props.customize && (props.customize as any)[nodeName]
    nodes[nodeName]['CustomizeProps'] = { customize: customizeProps }
  }
}