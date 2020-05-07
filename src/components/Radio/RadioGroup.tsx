import React from 'react';
import { BaseRadioProps } from './Radio';
import { UUI } from '../../utils/uui';

export interface RadioGroupOptions {
  label: string;
  value: string;
}
export interface BaseRadioGroupProps<T extends string | number> {
  /**
   * The name of a group of radios
   * @default none
   */
  name?: string;
  /**
   * The value of selected radio.
   *
   * T should be string or number.
   */
  value: T;
  /**
   * Callback invokes when user change to select radio.
   */
  onChange: (value: T) => void;
  /**
   * Array of `Radio`
   */
  children: React.ReactElement<BaseRadioProps<T>>[] | React.ReactElement<BaseRadioProps<T>>;
}

const RadioGroupNodes = {
  Root: 'div'
} as const

export class RadioGroup<K extends string | number> extends UUI.ClassComponent({
  name: "RadioGroup",
  nodes: RadioGroupNodes,
})<BaseRadioGroupProps<K>, {}> {

  render() {
    const { Root } = this.nodes
    return (
      <Root>
        {React.Children.map(this.props.children, (child: any) => {
          return React.cloneElement<BaseRadioProps<K>>(child, {
            ...child.props,
            ...(this.props.name ? { name: this.props.name } : {}),
            checked: child.props.value === this.props.value,
            onChange: () => {
              this.props.onChange(child.props.value)
            },
          })
        })}
      </Root>
    )
  }
}
