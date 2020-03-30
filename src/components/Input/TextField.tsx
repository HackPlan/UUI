import React from 'react';
import { omit } from 'lodash';
import { UUI } from '../../utils/uui';

type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>
export interface BaseTextFieldProps extends InputHTMLAttributes {
  type?: 'text' | 'tel' | 'url' | 'email' | 'password'
  value: string | null | undefined
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField = UUI.FunctionComponent({
  name: 'TextField',
  nodes: {
    Root: 'input'
  }
}, (props: BaseTextFieldProps, nodes) => {
  const { Root } = nodes
  return (
    <Root
      {...omit(props, 'leftNode', 'rightNode', 'value', 'onChange')}
      className={"u-w-full u-p-2 u-border u-border-black"}
      value={props.value || ''}
      onChange={(event) => {
        props.onChange(event.target.value, event)
      }}
    />
  )
})

export type TextFieldProps = Parameters<typeof TextField>[0]