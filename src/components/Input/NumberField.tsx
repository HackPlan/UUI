import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { limitPrecision, limitRange } from '../../utils/numberHelper';
import { LoadingSpinner } from '../Loading/LoadingSpinner';

export interface NumberFieldFeatureProps {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The minimum value of the input.
   * @default none
   */
  min?: number;
  /**
   * The maximum value of the input.
   * @default none
   */
  max?: number;
  /**
   * Limit number value precision.
   * @default none
   */
  precision?: number;
  /**
   * The step sets the stepping interval when clicking up and down spinner buttons.
   * @default none
   */
  step?: string | number;
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
  value?: number | null | undefined;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange?: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const NumberField = UUIFunctionComponent({
  name: 'NumberField',
  nodes: {
    Root: 'div',
    Input: 'input',
    LoadingSpinner: LoadingSpinner,
  }
}, (props: NumberFieldFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Input, LoadingSpinner } = nodes

  return (
    <Root
      {...NodeDataProps({
        'loading': !!props.loading,
        'disabled': !!props.disabled,
      })}
      role="input"
      aria-readonly={!!props.disabled}
      aria-placeholder={props.placeholder}
    >
      <Input
        placeholder={props.placeholder}
        type='number'
        max={props.max}
        min={props.min}
        step={props.step}
        disabled={props.disabled}
        value={props.value === undefined ? undefined : (
          props.value == null ? '' : parseFloat(props.value.toPrecision(10))
        )}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            let value = event.target.value
            value = limitPrecision(value, props.precision)
            let finalValue = parseFloat(value)
            if (isNaN(finalValue)) {
              props.onChange && props.onChange(null, event)
            } else {
              finalValue = limitRange(finalValue, props.min, props.max)
              props.onChange && props.onChange(finalValue, event)
            }
          }
        )}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      {props.loading && (
        <LoadingSpinner width={16} height={16} />
      )}
    </Root>

  )
})

export type NumberFieldProps = UUIFunctionComponentProps<typeof NumberField>
