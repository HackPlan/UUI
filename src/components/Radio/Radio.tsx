import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI, UUIComponentCustomizeProps, UUIConvenienceProps } from '../../utils/uui';

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
type RadioCustomizeProps = UUIComponentCustomizeProps<typeof RadioNodes>

export const Radio = <K extends string | number>(props: RadioCustomizeProps & BaseRadioProps<K> & UUIConvenienceProps) => {
  const BaseRadio = UUI.FunctionComponent({
    name: "Radio",
    nodes: RadioNodes,
  }, (props: BaseRadioProps<K>, nodes) => {
    const { Root, Input, Indicator, Label } = nodes

    return (
      <Root
        className={classNames({
          'disabled': props.disabled,
          'checked': props.checked,
        })}
      >
        <Input
          {...omit(props, 'type', 'customize')}
          type='radio'
        />
        <Indicator className={classNames([
          props.checked ? 'checked' : ''
        ])}></Indicator>
        <Label>{props.label}</Label>
      </Root>
    )
  })
  return <><BaseRadio {...props}></BaseRadio></>
}

export type RadioProps = Parameters<typeof Radio>[0]