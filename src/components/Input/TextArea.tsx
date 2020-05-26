import React from 'react';
import { UUI } from '../../core/uui';

export interface BaseTextAreaProps {
  /**
   * Form control name
   */
  name?: string;
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * The value to display in the input field.
   */
  value?: string | null | undefined;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * The maximum length of the input.
   * @default none
   */
  maxLength?: number;
  /**
   * Show input length indicator
   * @default false
   */
  showLengthIndicator?: boolean;
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

  console.log(props.value)
  return (
    <Root>
      <Textarea
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        maxLength={props.maxLength}
        value={props.value === undefined ? undefined : (props.value || undefined)}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            props.onChange && props.onChange(event.target.value, event)
          }
        )}
      />
      {props.maxLength && props.showLengthIndicator && (
        <LengthIndicator>
          {lengthIndicatorText}
        </LengthIndicator>
      )}
    </Root>
  )
})

export type TextAreaProps = Parameters<typeof TextArea>[0]
