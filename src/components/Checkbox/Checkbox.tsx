import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';

import './Checkbox.scss';
import { UUI } from '../../utils/uui';

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
>

export interface CheckboxProps extends InputHTMLAttributes {
  label?: string | React.ReactNode
  value: boolean
  onChange: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = UUI.FunctionComponent({
  name: 'Checkbox',
  nodes: {
    Root: 'label',
    Input: 'input',
    Indicator: 'span',
    Label: 'span',
  }
}, (props: CheckboxProps, nodes) => {
  const { Root, Input, Indicator, Label } = nodes

  return (
    <Root
      className={classNames("u-flex u-flex-row u-items-center u-block", {
        'u-cursor-pointer': !props.disabled,
        'u-cursor-not-allowed': props.disabled,
      })}
    >
      <Input
        {...omit(props, 'type', 'value', 'onChange')}
        type='checkbox'
        checked={props.value}
        onChange={(event) => {
          props.onChange(event.target.checked, event)
        }}
      />
      <Indicator className={classNames([
        props.value ? 'checked' : ''
      ])}></Indicator>
      <Label className="u-pl-2">{props.label}</Label>
    </Root>
  )
})
