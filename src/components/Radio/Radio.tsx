import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI } from '../../utils/uui';

import './Radio.scss';

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
>
export interface RadioProps<T extends string | number> extends InputHTMLAttributes {
  value?: T
  label?: string | React.ReactNode
}

export const Radio = UUI.FunctionComponent({
  name: "Radio",
  nodes: {
    Root: 'label',
    Input: 'input',
    Indicator: 'span',
    Label: 'span',
  }
}, (props: RadioProps<string | number>, nodes) => {
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
