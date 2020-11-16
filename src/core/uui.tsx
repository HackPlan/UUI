/**
 * UUI Core Component Util
 *
 * this file provides multiple utils for building powerful uui components.
 * Any component built using this tool supports custom styles,
 * which means you can modify className, style and even children of nodes in the component.
 */


import React, { useMemo } from 'react';
import { mapValues, isString, omit, merge, clone, uniq, isEmpty, mergeWith, pickBy, mapKeys } from 'lodash-es';
import classNames from 'classnames';
import { mergeRefs } from '../utils/mergeRefs';
import { UUICustomizeAriaAttributes } from './types/UUICustomizeAriaAttributes';

// ---------------------------------------------------------------
// Customize Extra Props
// ---------------------------------------------------------------

export interface NodeCustomizeClassNameProps {
  overrideClassName?: string;
  extendClassName?: string;
}
export interface NodeCustomizeStyleProps {
  overrideStyle?: React.CSSProperties;
  extendStyle?: React.CSSProperties;
}
export interface NodeCustomizeChildrenProps {
  children?: React.ReactNode;
  overrideChildren?: React.ReactNode;
  extendChildrenBefore?: React.ReactNode;
  extendChildrenAfter?: React.ReactNode;
}
export interface NodeCustomizeDataAttributesProps {
  dataAttributes?: {
    [key: string]: any;
  };
}
export interface NodeCustomizeAriaAttributesProps {
  ariaAttributes?: UUICustomizeAriaAttributes;
}
export type NodeCustomizeProps =
  & NodeCustomizeClassNameProps
  & NodeCustomizeStyleProps
  & NodeCustomizeChildrenProps
  & NodeCustomizeDataAttributesProps
  & NodeCustomizeAriaAttributesProps
  & React.RefAttributes<any>

// ---------------------------------------------------------------
// IntrinsicNode
// ---------------------------------------------------------------

type IntrinsicNodeCustomizeProps = NodeCustomizeProps
type IntrinsicNodeCustomizeOptions = {
  name: string;
  prefix: string;
  separator: string;
}

export type IntrinsicNodeT = JSX.IntrinsicElements
type IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string | number | symbol> = (tagName: T, nodeName: N, options: IntrinsicNodeCustomizeOptions) => (props: JSX.IntrinsicElements[T]) => JSX.Element
function IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string>(tagName: T, nodeName: N, options: IntrinsicNodeCustomizeOptions) {
  const nodeClassName = [options.prefix, options.name, nodeName].join(options.separator)

  const Node = React.forwardRef((innerProps: JSX.IntrinsicElements[T], _ref) => {
    const { customize } = (Node as any)['CustomizeProps'] as Readonly<{ customize?: IntrinsicNodeCustomizeProps }>
    const id = (customize as any | undefined)?.id || innerProps.id
    const className = (() => {
      if (customize?.overrideClassName) return customize.overrideClassName
      const innerClassName = innerProps.className
      const finalClassName = classNames(nodeClassName, innerClassName, customize?.extendClassName)
      return finalClassName
    })()
    const style = (() => {
      if (customize?.overrideStyle) return customize.overrideStyle
      const innerStyle = innerProps.style
      const finalStyle = merge(innerStyle, customize?.extendStyle)
      return isEmpty(finalStyle) ? undefined : finalStyle
    })()
    const dataAttributes = (() => {
      if (!customize?.dataAttributes) return {}
      /**
       * @reference https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Name
       * TODO: // fix regex for supporting unicode
       */
      const validDataAttributesCharactersRegex = /^([A-Za-z0-9-])*$/
      let result = customize.dataAttributes
      result = pickBy(result, (v, k) => validDataAttributesCharactersRegex.test(k))
      result = mapKeys(result, (v, k) => `data-${k}`)
      return result
    })()
    const children = (() => {
      /**
       * <select><option> only support string type children,
       * if pass Fragments to children, it will show [Object Object] in html.
       */
      if (tagName === 'option') return innerProps.children
      /**
       * <input> <textarea> <hr> is a void element tag and must not have `children`.
       */
      if (['input', 'textarea', 'hr'].includes(tagName)) return undefined
      if (customize?.overrideChildren) return customize.overrideChildren
      return <>{customize?.extendChildrenBefore}{innerProps.children}{customize?.extendChildrenAfter}</>
    })()

    const ariaAttributes = (() => {
      if (!customize?.ariaAttributes) return {}
      return mapKeys(customize.ariaAttributes, (v, k) => `aria-${k}`)
    })()

    /**
     * Merge both customize ref and component inner ref.
     */
    const ref = mergeRefs([customize?.ref, _ref])

    /**
     * Merge both customize functions and component inner onXXX callback functions.
     */
    const mergedCallbackFunctions = (() => {
      const propsObj = innerProps as any
      const customizeObj = (customize || {}) as any

      const data: any = {}
      const attrs = uniq([
        ...Object.keys(propsObj),
        ...Object.keys(customizeObj),
      ])
      for (const attr of attrs) {
        if (attr.startsWith('on')) {
          const propsObjFunctionExist = !!(propsObj[attr] && typeof propsObj[attr] === 'function')
          const customizeObjFunctionExist = !!(customizeObj[attr] && typeof customizeObj[attr] === 'function')

          data[attr] = (...args: any[]) => {
            if (propsObjFunctionExist) {
              propsObj[attr](...args);
            }
            if (customizeObjFunctionExist) {
              customizeObj[attr](...args);
            }
          };
        }
      }
      return data
    })()

    return React.createElement(tagName, {
      id,
      ...omit(innerProps, 'children', 'ref', 'className', 'style'),
      ...mergedCallbackFunctions,
      ...dataAttributes,
      ...ariaAttributes,
      ref,
      className, style,
    }, children)
  })
  Node.displayName = `<UUI> [IntrinsicNode] ${nodeName}`
  return Node
}

// ---------------------------------------------------------------
// ComponentNode
// ---------------------------------------------------------------

type ComponentNodeCustomizeProps<M extends string | number | symbol> = {
  [key in M]: IntrinsicNodeCustomizeProps
}
type ComponentNodeCustomizeOptions= {
  name: string;
  prefix: string;
  separator: string;
}

export type FunctionComponentNodeT = (props: any, ...args: any) => any
export interface TypeWithArgs<T, A extends any[]> extends Function { new(...args: A): T}
export type ClassComponentNodeT = TypeWithArgs<React.Component<any, any, any>, any>

type ComponentNode<P extends any, N extends string | number | symbol, M extends string | number | symbol> = (Target: React.FunctionComponent<P> | React.ComponentType<P>, nodeName: N, options: ComponentNodeCustomizeOptions) => (props: P) => JSX.Element
function ComponentNode<P extends any, N extends string, M extends string>(Target: React.FunctionComponent<P> | React.ComponentType<P>, nodeName: N, options: ComponentNodeCustomizeOptions) {
  const _Target = Target as any
  const Node = React.forwardRef((_props: P & UUIConvenienceProps & { customize?: ComponentNodeCustomizeProps<M> }, ref) => {
    const customizeProps = (Node as any)['CustomizeProps'] as Readonly<{ customize?: ComponentNodeCustomizeProps<M> }>
    const nodeClassName = [options.prefix, options.name, nodeName].join(options.separator)

    const finalCustomize = mergeCustomize(
      _props.customize,
      {
        Root: {
          extendClassName: nodeClassName,
        }
      } as any,
      undefined,
      customizeProps.customize,
    )

    return <_Target
      {...omit(_props, 'customize', 'ref')}
      prefix={options.prefix}
      separator={options.separator}
      ref={ref}
      className={_props.className}
      customize={finalCustomize}
    />
  })
  Node.displayName = `<UUI> [ComponentNode] ${nodeName}`
  return Node
}

// ---------------------------------------------------------------
// Type Helper
// ---------------------------------------------------------------

export type UUIComponentNodes<
  X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT },
> = {
  [key in keyof X]: X[key] extends keyof IntrinsicNodeT
    ? ReturnType<IntrinsicNode<X[key], key>>
    : (
      X[key] extends FunctionComponentNodeT | ClassComponentNodeT
      ? X[key]
      : never
    )
}
export type UUIComponentCustomizeProps<
  X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT },
> = {
  /**
   * Customize component nodes
   * @default none
   */
  customize?: {
    [key in keyof X]?: X[key] extends keyof IntrinsicNodeT
      ? NodeCustomizeProps & Partial<JSX.IntrinsicElements[X[key]]>
      : (
        X[key] extends FunctionComponentNodeT
        ? NonNullable<Parameters<X[key]>[0]['customize']>
        : (
          X[key] extends ClassComponentNodeT
          ? React.ComponentProps<X[key]>['customize']
          : never
        )
      )
  };
}
export type UUIConvenienceProps = {
  /**
   * Convenience id props,
   * this props will be applied to id of component Root node.
   */
  id?: string;
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

  /**
   * React natively support data-* attributes type,
   * dont need to redeclare again convenience data attributes.
   */
}
export type UUIMetaProps = {
  prefix?: string;
  separator?: string;
}
export type UUIComponentProps<P, X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT }> = P & UUIConvenienceProps & UUIComponentCustomizeProps<X>
export type UUIFunctionComponentProps<T extends (...args: any) => any> = Parameters<T>[0]
export type UUIClassComponentProps<T extends React.JSXElementConstructor<any>> = React.ComponentProps<T>

// ---------------------------------------------------------------
// UUI Component Util
// ---------------------------------------------------------------

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
    T extends keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT,
    /**
     * Generic type X for WrappedComponent generated nodes
     */
    X extends { [key in N]: T },
    /**
     * Generic type Z for component props.customize
     */
    Z extends UUIComponentCustomizeProps<X>
  >(
    options: {
      prefix?: string;
      name: string;
      separator?: string;
      nodes: X;
    },
    WrappedComponent: (props: P, nodes: UUIComponentNodes<X>) => React.ReactElement,
  ) {
    const component: React.FunctionComponent<P & UUIConvenienceProps & UUIMetaProps & Z> = (props) => {
      const { prefix, separator } = props;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { finalOptions, nodes } = useMemo(() => {
        const finalOptions = getFinalOptions(options, { prefix, separator })
        const nodes = compileNodes(finalOptions)
        return { finalOptions, nodes }
      }, [prefix, separator])
      const compiledProps = compileProps(props, finalOptions, undefined)
      injectCustomizeProps(nodes, compiledProps);
      return WrappedComponent(compiledProps, nodes)
    }
    component.displayName = `<UUI> [Component] ${options.name}`
    return component
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
    T extends keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT,
    /**
     * Generic type X for WrappedComponent generated nodes
     */
    X extends { [key in N]: T },
    /**
     * Generic type Z for component props.customize
     */
    Z extends UUIComponentCustomizeProps<X>
  >(
    options: {
      prefix?: string;
      name: string;
      separator?: string;
      nodes: X;
    },
  ) {
    return class WrappedComponent<P = {}, S = {}, SS = any> extends React.Component<P & UUIConvenienceProps & UUIMetaProps & Z, S & { nodes: UUIComponentNodes<X> }, SS> {
      static displayName = `<UUI> [Component] ${options.name}`
      state: S & { nodes: UUIComponentNodes<X> }

      componentDidUpdate(prevProps: P & UUIConvenienceProps & UUIMetaProps & Z) {
        if (
          prevProps.prefix !== this.props.prefix ||
          prevProps.separator !== this.props.separator
        ) {
          const finalOptions = getFinalOptions(options, this.props)
          this.setState({ nodes: compileNodes(finalOptions) })
          const compiledProps = compileProps(this.props, finalOptions, (this.props as any).innerRef || undefined)
          injectCustomizeProps(this.state.nodes, compiledProps)
        }
      }

      constructor(props: P & UUIConvenienceProps & Z) {
        super(props)
        const finalOptions = getFinalOptions(options, props)
        this.state = { nodes: compileNodes(finalOptions) } as any
        this.state.nodes = compileNodes(finalOptions)
        const compiledProps = compileProps(props, finalOptions, (props as any).innerRef || undefined)
        injectCustomizeProps(this.state.nodes, compiledProps)
      }
    }
  }
}

function getFinalOptions(options: any, props: any) {
  return {
    nodes: options.nodes,
    name: options.name,
    prefix: props.prefix || options.prefix || 'UUI',
    separator: props.separator || options.separator || '-',
  }
}

function compileProps(props: any, options: any, ref: any): any {
  const compiledProps = clone(props)
  if (!compiledProps.customize) {
    compiledProps.customize = {}
  }

  // Generally, UUI component should contain a Root node.
  if (
    (options.nodes as any)['Root'] &&
    isString((options.nodes as any)['Root'])
  ) {
    const rootCustomizeProps: any = (compiledProps.customize as any)['Root'] || {};
    /**
     * Convenience props: className, style
     * className will be injected into customize.Root { extendClassName: ... }
     * style will be injected into customize.Root { extendStyle: ... }
     * id will be injected into customize.Root { id: ... }
     */
    if (compiledProps.className) rootCustomizeProps.extendClassName = classNames(compiledProps.className, rootCustomizeProps.extendClassName);
    if (compiledProps.style) rootCustomizeProps.extendStyle = Object.assign(compiledProps.style, rootCustomizeProps.extendStyle);
    if (compiledProps.id) rootCustomizeProps.id = compiledProps.id;

    let dataAttributes = pickBy(compiledProps, (v, k) => k.startsWith('data-'))
    dataAttributes = mapKeys(dataAttributes, (v, k) => k.replace('data-', ''))
    if (!isEmpty(dataAttributes)) {
      rootCustomizeProps.dataAttributes = Object.assign(dataAttributes, rootCustomizeProps.dataAttributes);
    }


    let ariaAttributes = pickBy(compiledProps, (v, k) => k.startsWith('aria-'))
    ariaAttributes = mapKeys(ariaAttributes, (v, k) => k.replace('aria-', ''))
    if (!isEmpty(ariaAttributes)) {
      rootCustomizeProps.ariaAttributes = Object.assign(ariaAttributes, rootCustomizeProps.ariaAttributes);
    }

    (compiledProps.customize as any)['Root'] = rootCustomizeProps;
  }
  compiledProps.ref = ref

  return  compiledProps
}

function compileNodes(options: any): any {
  return mapValues(options.nodes, (nodeElement, nodeName) => {
    if (isString(nodeElement)) {
      return IntrinsicNode(nodeElement as any, nodeName, options)
    } else {
      return ComponentNode(nodeElement as any, nodeName, options)
    }
  })
}

function injectCustomizeProps(nodes: any, props: any) {
  for (const nodeName of Object.keys(nodes)) {
    const customizeProps = props.customize && (props.customize as any)[nodeName]
    nodes[nodeName]['CustomizeProps'] = { customize: customizeProps }
  }
}

function mergeCustomize<M extends string>(...customizes: Array<ComponentNodeCustomizeProps<M> | undefined>): ComponentNodeCustomizeProps<M> | undefined {
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