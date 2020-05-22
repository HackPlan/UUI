import React from 'react';
import { UUI, UUIComponentProps } from '../../utils/uui';
import { isString } from 'lodash';

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

const BaseHTMLSelect = UUI.FunctionComponent({
  name: "HTMLSelect",
  nodes: HTMLSelectNodes,
}, (props: BaseHTMLSelectProps<any>, nodes) => {
  const { Root, Select, Option } = nodes
  return (
    <Root>
      <Select
        value={props.value}
        onChange={(event) => {
          if (isString(props.value)) {
            props.onChange(event.target.value)
          } else {
            props.onChange(Number(event.target.value))
          }
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

export function HTMLSelect<T extends string | number>(props: UUIComponentProps<BaseHTMLSelectProps<T>, typeof HTMLSelectNodes>) {
  return <BaseHTMLSelect {...props} />
}
