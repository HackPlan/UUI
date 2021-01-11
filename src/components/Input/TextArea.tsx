import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

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

  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export const TextAreaPropTypes = createComponentPropTypes<TextAreaFeatureProps>({
  name: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  showLengthIndicator: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
})

export const TextArea = UUIFunctionComponent({
  name: 'TextArea',
  nodes: {
    Root: 'div',
    Textarea: 'textarea',
    Info: 'div',
    LengthIndicator: 'div',
    LoadingSpinner: LoadingSpinner,
  },
  propTypes: TextAreaPropTypes,
}, (props: TextAreaFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Textarea, Info, LengthIndicator, LoadingSpinner } = nodes

  const lengthIndicatorText = (`${props.value?.length || 0}`) + (props.maxLength ? `/${props.maxLength}` : '')

  const hasCornerIndicator = !!props.loading || props.showLengthIndicator
  return (
    <Root
      {...NodeDataProps({
        'loading': !!props.loading,
        'disabled': !!props.disabled,
        'has-indicator': !!hasCornerIndicator,
      })}
      role="input"
      aria-readonly={!!props.disabled}
      aria-placeholder={props.placeholder}
      aria-multiline
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
        onFocus={props.onFocus}
        onBlur={props.onBlur}
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

export type TextAreaProps = UUIFunctionComponentProps<typeof TextArea>
