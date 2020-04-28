import React from 'react';
import { UUI } from '../../utils/uui';
import './NumberField.scss';
import { limitPrecision, limitRange } from '../../utils/numberHelper';

export interface BaseNumberFieldProps {
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
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * The value to display in the input field.
   */
  value: number | null | undefined;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Deprecated.
   * FIXME: remove it when uui component customize props support IntrinsicAttriobutes
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const NumberField = UUI.FunctionComponent({
  name: 'NumberField',
  nodes: {
    Root: 'div',
    Input: 'input',
  }
}, (props: BaseNumberFieldProps, nodes) => {
  const { Root, Input } = nodes

  return (
    <Root className={"u-w-full u-border u-border-black"}>
      <Input
        onKeyDown={props.onKeyDown}
        type='number'
        max={props.max}
        min={props.min}
        step={props.step}
        disabled={props.disabled}
        value={props.value == null ? '' : parseFloat(props.value.toPrecision(10))}
        onChange={(event) => {
          let value = event.target.value
          value = limitPrecision(value, props.precision)
          let finalValue = parseFloat(value)
          if (isNaN(finalValue)) {
            props.onChange(null, event)
          } else {
            finalValue = limitRange(finalValue, props.min, props.max)
            props.onChange(finalValue, event)
          }
        }}
      />
    </Root>

  )
})

export type NumberFieldProps = Parameters<typeof NumberField>[0]
