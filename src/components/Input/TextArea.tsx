import React from 'react';
import { UUI } from '../../core/uui';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import classNames from 'classnames';

export interface TextAreaFeatureProps {
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
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
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
    Info: 'div',
    LengthIndicator: 'div',
    LoadingSpinner: LoadingSpinner,
  }
}, (props: TextAreaFeatureProps, nodes) => {
  const { Root, Textarea, Info, LengthIndicator, LoadingSpinner } = nodes

  const lengthIndicatorText = (`${props.value?.length || 0}`) + (props.maxLength ? `/${props.maxLength}` : '')

  const hasCornerIndicator = !!props.loading || props.showLengthIndicator
  return (
    <Root
      role="input"
      aria-readonly={!!props.disabled}
      aria-placeholder={props.placeholder}
      aria-multiline
      className={classNames({
        'STATE_disabled': props.disabled,
        'STATE_loading': props.loading,
        'STATE_hasCornerIndicator': hasCornerIndicator,
      })}
    >
      <Textarea
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        maxLength={props.maxLength}
        value={props.value === undefined ? undefined : (props.value || '')}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            props.onChange && props.onChange(event.target.value, event)
          }
        )}
      />
      <Info>
        {props.loading && (
          <LoadingSpinner width={16} height={16} />
        )}
        {props.maxLength && props.showLengthIndicator && (
          <LengthIndicator>
            {lengthIndicatorText}
          </LengthIndicator>
        )}
      </Info>
    </Root>
  )
})

export type TextAreaProps = Parameters<typeof TextArea>[0]
