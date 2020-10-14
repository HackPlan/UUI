import React from 'react';
import { UUI } from '../../core/uui';
import { Button } from '../../components/Button';
import { NumberField } from '../Input';
import { limitRange } from '../../utils/numberHelper';
import { Icons } from '../../icons/Icons';
import classNames from 'classnames';
import { KeyCode } from '../../utils/keyboardHelper';

export interface StepperFeatureProps {
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
    PlusUpIcon: Icons.ChevronUp,
    PlusRightIcon: Icons.ChevronRight,
    MinusDownIcon: Icons.ChevronDown,
    MinusLeftIcon: Icons.ChevronLeft,
  }
}, (props: StepperFeatureProps, nodes) => {
  const {
    Root, MinusButton, PlusButton, Input, RightControlsContainer,
    PlusUpIcon, PlusRightIcon, MinusDownIcon, MinusLeftIcon,
  } = nodes

  const finalProps = {
    step: props.step || 1,
    controlPosition: props.controlPosition || 'separate'
  }

  const minus = (
    <MinusButton
      tabIndex={-1}
      onClick={() => {
        const finalValue = limitRange((props.value || 0) - finalProps.step, props.min, props.max)
        props.onChange(finalValue)
      }}
      disabled={props.disabled || (props.min && props.value && props.value - props.min <= 0 || false)}
    >
      {props.controlPosition === 'right' ? (
        <MinusDownIcon width={14} height={14} />
      ) : (
        <MinusLeftIcon width={16} height={16} />
      )}
    </MinusButton>
  )
  const plus = (
    <PlusButton
      tabIndex={-1}
      onClick={() => {
        const finalValue = limitRange((props.value || 0) + finalProps.step, props.min, props.max)
        props.onChange(finalValue)
      }}
      disabled={props.disabled || (props.max && props.value && props.value - props.max >= 0 || false)}
    >
      {props.controlPosition === 'right' ? (
        <PlusUpIcon width={14} height={14} />
      ) : (
        <PlusRightIcon width={16} height={16} />
      )}
    </PlusButton>)
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

  return (
    <Root
      role="spinbutton"
      tabIndex={0}
      aria-valuemax={props.max}
      aria-valuemin={props.min}
      aria-valuenow={props.value || undefined}
      className={classNames({
        'POSITION_controlSeparate': finalProps.controlPosition === 'separate',
        'POSITION_controlRight': finalProps.controlPosition === 'right',
      })}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.ArrowLeft:
          case KeyCode.ArrowDown: {
            const finalValue = limitRange((props.value || 0) - finalProps.step, props.min, props.max)
            props.onChange(finalValue)
            break
          }
          case KeyCode.ArrowRight:
          case KeyCode.ArrowUp: {
            const finalValue = limitRange((props.value || 0) + finalProps.step, props.min, props.max)
            props.onChange(finalValue)
            break
          }
          case KeyCode.PageDown: {
            const finalValue = limitRange((props.value || 0) - finalProps.step * 10, props.min, props.max)
            props.onChange(finalValue)
            break
          }
          case KeyCode.PageUp: {
            const finalValue = limitRange((props.value || 0) + finalProps.step * 10, props.min, props.max)
            props.onChange(finalValue)
            break
          }
          case KeyCode.Home: {
            if (props.max !== undefined) {
              props.onChange(props.max)
            }
            break
          }
          case KeyCode.End: {
            if (props.min !== undefined) {
              props.onChange(props.min)
            }
            break
          }
          default:
            // do nothing
        }
      }}
    >
      {finalProps.controlPosition === 'separate' && (
        <>{minus}{input}{plus}</>
      )}
      {finalProps.controlPosition === 'right' && (
        <>
          {input}
          <RightControlsContainer>
            {plus}{minus}
          </RightControlsContainer>
        </>
      )}
    </Root>
  )
})

export type StepperProps = Parameters<typeof Stepper>[0]
