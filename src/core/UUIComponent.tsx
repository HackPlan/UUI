import { isString, mapValues } from "lodash-es";
import React, { useMemo, useContext } from "react";
import { UUIComponentCustomizeProps, UUIConvenienceProps, UUIMetaProps } from "./modules/UUIComponentProps";
import { ClassComponentNodeT, ComponentNode, FunctionComponentNodeT, IntrinsicNode, IntrinsicNodeT, UUIComponentNodes } from "./modules/UUICustomizeNode";
import { compileProps } from "./utils/compileProps";
import { UUIProviderContext, UUIProviderContextValue } from "../UUIProvider";
import { mergeProviderCustomize } from './utils/mergeProviderCustomize';

export interface UUIComponentHelper<
  X extends { [key in string]?: keyof IntrinsicNodeT | FunctionComponentNodeT | ClassComponentNodeT },
> {
  ref: any;
  nodes: UUIComponentNodes<X>;
  options: {
    prefix: string;
    name: string;
    separator: string;
    nodes: X;
  };
  NodeDataProps: (data: { [key: string]: string | boolean | null | undefined }) => { [key: string]: string };
}

/**
 * UUI Advanced Component for Function Component
 * @param options setup options
 * @param WrappedComponent wrapped function component
 */
export function UUIFunctionComponent<
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
  WrappedComponent: (props: P, helper: UUIComponentHelper<X>) => React.ReactElement,
) {
  const component = React.forwardRef((props: P & UUIConvenienceProps & UUIMetaProps & Z, ref) => {
    const { prefix, separator } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const providerContext = useContext(UUIProviderContext)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { nodes, finalOptions } = useMemo(() => {
      const finalOptions = getFinalOptions(options, { prefix, separator }, providerContext)
      const nodes = compileNodes(finalOptions)
      return { nodes, finalOptions }
    }, [prefix, separator, providerContext])

    const compiledProps = compileProps(props, ref)
    mergeProviderCustomize(options, compiledProps, providerContext)
    injectCustomizeProps(nodes, compiledProps)

    return WrappedComponent(compiledProps, {
      ref,
      nodes,
      options: finalOptions,
      NodeDataProps: getNodeDataProps(finalOptions),
    })
  });
  component.displayName = `<UUI> [Component] ${options.name}`
  return component
}

/**
 * UUI Advanced Component for Class Component
 * @param options setup options
 */
export function UUIClassComponent<
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
  return class WrappedComponent<P = {}, S = {}, SS = any> extends React.Component<P & UUIConvenienceProps & UUIMetaProps & Z, S, SS> {
    static displayName = `<UUI> [Component] ${options.name}`
    static contextType = UUIProviderContext

    state: S
    helper: UUIComponentHelper<X>

    componentDidUpdate(prevProps: P & UUIConvenienceProps & UUIMetaProps & Z) {
      if (prevProps.prefix !== this.props.prefix || prevProps.separator !== this.props.separator) {
        const finalOptions = getFinalOptions(options, this.props, this.context)
        this.helper = {
          ref: this.props.ref,
          nodes: compileNodes(finalOptions),
          options: finalOptions,
          NodeDataProps: getNodeDataProps(finalOptions),
        }
        const compiledProps = compileProps(this.props, (this.props as any).innerRef || undefined)
        mergeProviderCustomize(options, compiledProps, this.context)
        injectCustomizeProps(this.helper.nodes, compiledProps)
        this.forceUpdate()
      }
    }

    constructor(props: P & UUIConvenienceProps & Z) {
      super(props)
      this.state = {} as any
      const finalOptions = getFinalOptions(options, props, this.context)
      this.helper = {
        ref: props.ref,
        nodes: compileNodes(finalOptions),
        options: finalOptions,
        NodeDataProps: getNodeDataProps(finalOptions),
      }
      const compiledProps = compileProps(props, (props as any).innerRef || undefined)
      mergeProviderCustomize(options, compiledProps, this.context)
      injectCustomizeProps(this.helper.nodes, compiledProps)
    }
  }
}

function getFinalOptions(options: any, props: any, providerContext: UUIProviderContextValue<any> | null) {
  const prefix = props.prefix || providerContext?.options?.prefix || options.prefix || 'UUI'
  const separator = props.separator || providerContext?.options?.separator || options.separator || '-'
  return {
    nodes: options.nodes,
    name: options.name,
    prefix: prefix,
    separator: separator,
  }
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

function getNodeDataProps(options: any) {
  return (data: any) => {
    const prefix = `data-${options.prefix.toLowerCase()}-`
    const stateProps: any = {}

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === null) continue
      stateProps[`${prefix}${key}`] = String(value)
    }

    return stateProps

  }
}
