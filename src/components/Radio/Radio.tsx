import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI, UUIComponentProps } from '../../core/uui';

type InputHTMLAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'disabled' | 'onChange'
>
export interface BaseRadioProps<T extends string | number> extends InputHTMLAttributes {
  /**
   * Form control name
   */
  name?: string;
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

const BaseRadio = UUI.FunctionComponent({
  name: "Radio",
  nodes: RadioNodes,
}, (props: BaseRadioProps<any>, nodes) => {
  const { Root, Input, Indicator, Label } = nodes

  return (
    <Root
      className={classNames({
        'disabled': props.disabled,
      })}
    >
      <Input
        {...omit(props, 'type', 'label', 'customize')}
        name={props.name}
        type='radio'
      />
      <Indicator></Indicator>
      <Label>{props.label}</Label>
    </Root>
  )
})

export function Radio<T extends string | number>(props: UUIComponentProps<BaseRadioProps<T>, typeof RadioNodes>) {
  return <BaseRadio {...props} />
}
export type RadioProps = Parameters<typeof Radio>[0]
