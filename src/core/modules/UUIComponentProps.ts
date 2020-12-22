import { IntrinsicNodeT, FunctionComponentNodeT, ClassComponentNodeT, NodeCustomizeProps } from "./UUICustomizeNode"
import { Ref } from "react"

export type UUIConvenienceProps = {
  /**
   * Convenience id props,
   * this props will be applied to id of component Root node.
   */
  id?: string;
  /**
   * Convenience ref props,
   * this props will be applied to ref of component Root node.
   */
  ref?: Ref<any>;
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