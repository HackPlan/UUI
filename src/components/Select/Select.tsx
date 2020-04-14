import React from 'react';
import { UUI, UUIConvenienceProps, UUIComponentCustomizeProps } from '../../utils/uui';


export interface SelectOption<T> {
  label: string
  value: T
}

export interface BaseSelectProps<T extends string | number> {
  /**
   * The options of select
   */
  options: SelectOption<T>[]
  /**
   * The value of selected option.
   *
   * T should be string or string.
   */
  value: T
  /**
   * Callback invokes when user change to select option.
   */
  onChange: (value: T) => void
}

const SelectNodes = {
  Root: 'label',
  Input: 'input',
  Indicator: 'span',
  Label: 'span',
} as const
type SelectCustomizeProps = UUIComponentCustomizeProps<typeof SelectNodes>

/**
 * Notes: The base props of Select compoent is a generic type,
 * due to `Partial<Pick<Parameters<BaseSelect>[0]>>` infer to `never`,
 * This component we use UUIComponentCustomizeProps to get customize props.
 *
 * Currently UUI Component Util un-support generic props type.
 * TODO: enhance UUI function component props generic
 */

export const Select = <K extends string | number>(props: UUIConvenienceProps & BaseSelectProps<K> & SelectCustomizeProps) => {
  const BaseSelect = UUI.FunctionComponent({
    name: "Select",
    nodes: {
      Root: 'div',
      Select: 'select',
      Option: 'option',
    }
  }, (props: BaseSelectProps<K>, nodes) => {
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
  return <><BaseSelect {..._props}></BaseSelect></>
}

export type SelectProps = Parameters<typeof Select>[0]