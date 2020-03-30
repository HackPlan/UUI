import React from 'react';
import { UUI, UUIConvenienceProps, UUIFunctionComponentCustomizeProps } from '../../utils/uui';


export interface SelectOption<T> {
  label: string
  value: T
}

type SelectHTMLAttributes = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
>
export interface BaseSelectProps<T extends string | number> extends SelectHTMLAttributes {
  options: SelectOption<T>[]
  value: T
  onChange: (value: T) => void
}

const SelectNodes = {
  Root: 'label',
  Input: 'input',
  Indicator: 'span',
  Label: 'span',
} as const
type SelectCustomizeProps = UUIFunctionComponentCustomizeProps<typeof SelectNodes>

// TODO: enhance UUI function component props generic
export const Select = <K extends string | number>(props: SelectCustomizeProps & UUIConvenienceProps & BaseSelectProps<K>) => {
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
  return <><BaseSelect {...props}></BaseSelect></>
}

export type SelectProps = Parameters<typeof Select>[0]