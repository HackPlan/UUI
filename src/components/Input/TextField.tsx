import React from 'react';
import { omit, pick } from 'lodash';
import { UUI } from '../../utils/uui';
import './TextField.scss';

export interface BaseTextFieldProps {
  /**
   * The type of user input.
   * TextField only support string kind type
   */
  type?: 'text' | 'tel' | 'url' | 'email' | 'password'
  /**
   * The value to display in the input field.
   */
  value: string | null | undefined
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The maximum length of the input.
   * @default none
   */
  maxLength?: number
  /**
   * Show input length indicator
   * @default false
   */
  showLengthIndicator?: boolean
}

export const TextField = UUI.FunctionComponent({
  name: 'TextField',
  nodes: {
    Root: 'div',
    Input: 'input',
    LengthIndicator: 'div',
  }
}, (props: BaseTextFieldProps, nodes) => {
  const { Root, Input, LengthIndicator } = nodes
  const lengthIndicatorText = (`${props.value?.length || 0}`) + (props.maxLength ? `/${props.maxLength}` : '')
  return (
    <Root className={"u-w-full u-p-2 u-border u-border-black"}>
      <Input
        {...pick(props, 'maxLength', 'type', 'value', 'onChange')}
        value={props.value || ''}
        onChange={(event) => {
          props.onChange(event.target.value, event)
        }}
      ></Input>
      {props.maxLength && props.showLengthIndicator && (
        <LengthIndicator>
          {lengthIndicatorText}
        </LengthIndicator>
      )}
    </Root>
  )
})

export type TextFieldProps = Parameters<typeof TextField>[0]
