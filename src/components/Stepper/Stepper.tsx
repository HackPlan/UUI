import React from 'react';
import { UUI } from '../../utils/uui';
import { Button } from '../..';
import { NumberField } from '../Input';
import './Stepper.scss';
import { limitRange } from '../../utils/numberHelper';

export interface BaseStepperProps {
  /**
   * The value to display in the input field.
   */
  value: number | null;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: number | null) => void;
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
   * The step sets the stepping interval when clicking up and down spinner buttons.
   * @default none
   */
  step?: number;
  /**
   * Limit number value precision.
   * @default none
   */
  precision?: number;
  /**
   * Indicate where controls should display.
   * @default separate
   */
  controlPosition?: 'separate' | 'right';
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
}

export const Stepper = UUI.FunctionComponent({
  name: 'Stepper',
  nodes: {
    Root: 'div',
    MinusButton: Button,
    PlusButton: Button,
    Input: NumberField,
    RightControlsContainer: 'div',
  }
}, (props: BaseStepperProps, nodes) => {
  const { Root, MinusButton, PlusButton, Input, RightControlsContainer } = nodes

  const finalProps = {
    step: props.step || 1,
    controlPosition: props.controlPosition || 'separate'
  }

  const minus = (
    <MinusButton
      onClick={() => {
        const finalValue = limitRange((props.value || 0) - finalProps.step, props.min, props.max)
        props.onChange(finalValue)
      }}
      disabled={props.disabled || (props.min && props.value && props.value - props.min <= 0 || false)}
    >-</MinusButton>
  )
  const plus = (
    <PlusButton
      onClick={() => {
        const finalValue = limitRange((props.value || 0) + finalProps.step, props.min, props.max)
        props.onChange(finalValue)
      }}
      disabled={props.disabled || (props.max && props.value && props.value - props.max >= 0 || false)}
    >+</PlusButton>)
  const input = (
    <Input
      step={props.step}
      min={props.min}
      max={props.max}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  )

  switch (finalProps.controlPosition) {
    case 'separate':
      return (
        <Root className={"ControlSeparate"}>
          {minus}{input}{plus}
        </Root>
      )
    case 'right':
      return (
        <Root className={"ControlRight"}>
          {input}
          <RightControlsContainer>
            {plus}{minus}
          </RightControlsContainer>
        </Root>
      )
  }
})

export type StepperProps = Parameters<typeof Stepper>[0]
