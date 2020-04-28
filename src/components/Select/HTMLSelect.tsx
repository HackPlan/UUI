import React from 'react';
import { UUI, UUIConvenienceProps, UUIComponentCustomizeProps } from '../../utils/uui';


export interface HTMLSelectOption<T> {
  label: string;
  value: T;
}

export interface BaseHTMLSelectProps<T extends string | number> {
  /**
   * The options of select
   */
  options: HTMLSelectOption<T>[];
  /**
   * The value of selected option.
   *
   * T should be string or string.
   */
  value: T;
  /**
   * Callback invokes when user change to select option.
   */
  onChange: (value: T) => void;
}

const HTMLSelectNodes = {
  Root: 'div',
  Select: 'select',
  Option: 'option',
} as const
type HTMLSelectCustomizeProps = UUIComponentCustomizeProps<typeof HTMLSelectNodes>

/**
 * Notes: The base props of HTMLSelect compoent is a generic type,
 * due to `Partial<Pick<Parameters<BaseHTMLSelect>[0]>>` infer to `never`,
 * This component we use UUIComponentCustomizeProps to get customize props.
 *
 * Currently UUI Component Util un-support generic props type.
 * TODO: enhance UUI function component props generic
 */

export const HTMLSelect = <K extends string | number>(props: UUIConvenienceProps & BaseHTMLSelectProps<K> & HTMLSelectCustomizeProps) => {
  const BaseHTMLSelect = UUI.FunctionComponent({
    name: "HTMLSelect",
    nodes: HTMLSelectNodes,
  }, (props: BaseHTMLSelectProps<K>, nodes) => {
    const { Root, Select, Option } = nodes

    return (
      <Root className="u-p-2 u-border u-border-black">
        <Select
          className="u-bg-white u-w-full"
          value={props.value}
          onChange={(event) => {
            props.onChange(event.target.value as any)
          }}
        >
          {props.options.map((i) => {
            return (
              <Option key={i.value} value={i.value}>{i.label}</Option>
            )
          })}
        </Select>
      </Root>
    )
  })
  // temp fix
  const _props = props as any
  return <><BaseHTMLSelect {..._props}></BaseHTMLSelect></>
}

export type HTMLSelectProps = Parameters<typeof HTMLSelect>[0]