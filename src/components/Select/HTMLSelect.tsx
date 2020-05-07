import React from 'react';
import { UUI } from '../../utils/uui';


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

export class HTMLSelect<K extends string | number> extends UUI.ClassComponent({
  name: "HTMLSelect",
  nodes: HTMLSelectNodes,
})<BaseHTMLSelectProps<K>, {}> {
  render() {
    const { Root, Select, Option } = this.nodes
    return (
      <Root>
        <Select
          value={this.props.value}
          onChange={(event) => {
            this.props.onChange(event.target.value as any)
          }}
        >
          {this.props.options.map((i) => {
            return (
              <Option key={i.value} value={i.value}>{i.label}</Option>
            )
          })}
        </Select>
      </Root>
    )
  }
}
