import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI, UUIComponentCustomizeProps, UUIConvenienceProps } from '../../utils/uui';

import './Radio.scss';

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
  value: T
  /**
   * The label of radio.
   * @default none
   */
  label?: string | React.ReactNode
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
        className={classNames("u-flex u-flex-row u-items-center u-block", {
          'u-cursor-pointer': !props.disabled,
          'u-cursor-not-allowed': props.disabled,
        })}
      >
        <Input
          {...omit(props, 'type')}
          type='radio'
        />
        <Indicator className={classNames([
          props.checked ? 'checked' : ''
        ])}></Indicator>
        <Label className="u-pl-2">{props.label}</Label>
      </Root>
    )
  })
  type XXX = Partial<Pick<Parameters<typeof BaseRadio>[0], 'customize'>>
  return <><BaseRadio {...props}></BaseRadio></>
}

export type RadioProps = Parameters<typeof Radio>[0]