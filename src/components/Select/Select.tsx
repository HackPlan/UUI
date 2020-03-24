import React, { useMemo } from 'react';
import { initStylished, StylishProps } from '../../utils/stylish';


export enum SelectNodeName {
  Root = "root",
  Select = "select",
  Option = "option",

}

export interface SelectOption<T> {
  label: string
  value: T
}

type SelectHTMLAttributes = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
>
export interface SelectProps<T extends string | number> extends SelectHTMLAttributes, StylishProps<SelectNodeName> {
  options: SelectOption<T>[]
  value: T
  onChange: (value: T) => void
}


export function Select<T extends string | number>(props: SelectProps<T>) {

  // Initial Nodes
  const [
    Root,
    Select,
    Option,
  ] = useMemo(() => {
    const stylished = initStylished(SelectNodeName.Select, props, { prefix: "uui" })
    return [
      stylished.element('div', SelectNodeName.Root),
      stylished.element('select', SelectNodeName.Select),
      stylished.element('option', SelectNodeName.Option),
    ]
  }, [])

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
}
