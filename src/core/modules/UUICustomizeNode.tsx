import React from "react";
import { mergeRefs } from "../utils/mergeRefs";
import { mapKeys, uniq, omit, merge, isEmpty, pickBy } from "lodash-es";
import { mergeCustomize } from "../utils/mergeCustomize";
import classNames from "classnames";
import { TypeWithArgs } from "../utils/typeHelper";
import { UUICustomizeAriaAttributes } from "./UUICustomizeAriaAttributes";

export interface NodeCustomizeIdProps {
  overrideId?: string;
}
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
  & NodeCustomizeIdProps
  & NodeCustomizeClassNameProps
  & NodeCustomizeStyleProps
  & NodeCustomizeChildrenProps
  & NodeCustomizeDataAttributesProps
  & NodeCustomizeAriaAttributesProps
  & React.RefAttributes<any>

export type NodeCustomizeOptions = {
  name: string;
  prefix: string;
  separator: string;
}

export type IntrinsicNodeCustomizeProps = NodeCustomizeProps
export type IntrinsicNodeT = JSX.IntrinsicElements
export type IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string | number | symbol> = (tagName: T, nodeName: N, options: NodeCustomizeOptions) => (props: JSX.IntrinsicElements[T]) => JSX.Element
export function IntrinsicNode<T extends keyof JSX.IntrinsicElements, N extends string>(tagName: T, nodeName: N, options: NodeCustomizeOptions) {
  const nodeClassName = [options.prefix, options.name, nodeName].join(options.separator)

  const Node = React.forwardRef((innerProps: JSX.IntrinsicElements[T], _ref) => {
    const { customize } = (Node as any)['CustomizeProps'] as Readonly<{ customize?: IntrinsicNodeCustomizeProps }>
    const id = customize?.overrideId || innerProps.id
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
      ...omit(innerProps, 'children', 'ref', 'className', 'style'),
      ...mergedCallbackFunctions,
      ...dataAttributes,
      ...ariaAttributes,
      ref,
      id, className, style,
    }, children)
  })
  Node.displayName = `<UUI> [IntrinsicNode] ${nodeName}`
  return Node
}


export type ComponentNodeCustomizeProps<M extends string | number | symbol> = {
  [key in M]: IntrinsicNodeCustomizeProps
}
export type FunctionComponentNodeT = (props: any, ...args: any) => any
export type ClassComponentNodeT = TypeWithArgs<React.Component<any, any, any>, any>
export type ComponentNode<P extends any, N extends string | number | symbol> = (Target: React.FunctionComponent<P> | React.ComponentType<P>, nodeName: N, options: NodeCustomizeOptions) => (props: P) => JSX.Element
export function ComponentNode<P extends any, N extends string, M extends string>(Target: React.FunctionComponent<P> | React.ComponentType<P>, nodeName: N, options: NodeCustomizeOptions) {
  const _Target = Target as any
  const Node = React.forwardRef((_props: P & { customize?: ComponentNodeCustomizeProps<M> }, ref) => {
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
      customize={finalCustomize}
    />
  })
  Node.displayName = `<UUI> [ComponentNode] ${nodeName}`
  return Node
}

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
