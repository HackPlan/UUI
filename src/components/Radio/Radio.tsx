import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI, UUIComponentProps } from '../../core/uui';

type InputHTMLAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'disabled' | 'onChange'
>
export interface RadioFeatureProps<T extends string | number> extends InputHTMLAttributes {
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
}, (props: RadioFeatureProps<any>, nodes) => {
  const { Root, Input, Indicator, Label } = nodes

  return (
    <Root
      role="radio"
      aria-checked={props.checked}
      className={classNames({
        'STATE_disabled': props.disabled,
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

export function Radio<T extends string | number>(props: UUIComponentProps<RadioFeatureProps<T>, typeof RadioNodes>) {
  return <BaseRadio {...props} />
}
Radio.displayName = `<UUI> [GenericComponent] Radio`
export type RadioProps = Parameters<typeof Radio>[0]
