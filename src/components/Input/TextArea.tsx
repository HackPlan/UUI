import React, { useState, useEffect } from 'react';
import { UUI } from '../../utils/uui';
import './TextArea.scss';

export interface BaseTextAreaProps {
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string
  /**
   * The value to display in the input field.
   */
  value: string | null | undefined
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
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

export const TextArea = UUI.FunctionComponent({
  name: 'TextArea',
  nodes: {
    Root: 'div',
    Textarea: 'textarea',
    LengthIndicator: 'div',
  }
}, (props: BaseTextAreaProps, nodes) => {
  const { Root, Textarea, LengthIndicator } = nodes

  const lengthIndicatorText = (`${props.value?.length || 0}`) + (props.maxLength ? `/${props.maxLength}` : '')

  return (
    <Root className={"u-w-full u-border u-border-black"}>
      <Textarea
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        value={props.value || ''}
        onChange={(event) => {
          props.onChange(event.target.value, event)
        }}
      ></Textarea>
      {props.maxLength && props.showLengthIndicator && (
        <LengthIndicator>
          {lengthIndicatorText}
        </LengthIndicator>
      )}
    </Root>
  )
})

export type TextAreaProps = Parameters<typeof TextArea>[0]
