import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI } from '../../utils/uui';

type InputHTMLAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'disabled' | 'onChange'
>
export interface BaseRadioProps<T extends string | number> extends InputHTMLAttributes {
  /**
   * The value of radio.
   *
   * T should be string or number.
   */
  value: T;
  /**
   * The label of radio.
   * @default none
   */
  label?: string | React.ReactNode;
}

const RadioNodes = {
  Root: 'label',
  Input: 'input',
  Indicator: 'span',
  Label: 'span',
} as const

export class Radio<K extends string | number> extends UUI.ClassComponent({
  name: "Radio",
  nodes: RadioNodes,
})<BaseRadioProps<K>, {}> {

  render() {
    const { Root, Input, Indicator, Label } = this.nodes
    return (
      <Root
        className={classNames({
          'disabled': this.props.disabled,
          'checked': this.props.checked,
        })}
      >
        <Input
          {...omit(this.props, 'type', 'customize')}
          type='radio'
        />
        <Indicator className={classNames([
          this.props.checked ? 'checked' : ''
        ])}></Indicator>
        <Label>{this.props.label}</Label>
      </Root>
    )
  }
}