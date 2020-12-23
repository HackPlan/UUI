import React, { useRef } from 'react';
import classNames from 'classnames';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { KeyCode } from '../../utils/keyboardHelper';

export interface CheckboxFeatureProps {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The label of checkbox.
   * @default none
   */
  label?: React.ReactNode | string;
  /**
   * Whether this checkbox is selected.
   */
  checked?: boolean;
  /**
   * value of this checkbox.
   */
  value?: string;
  /**
   * Callback invoked when user changes select state.
   * @default none
   */
  onChange?: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;

  onFocus?: React.FocusEventHandler<HTMLLabelElement>;
  onBlur?: React.FocusEventHandler<HTMLLabelElement>;
}

export const Checkbox = UUIFunctionComponent({
  name: 'Checkbox',
  nodes: {
    Root: 'label',
    Input: 'input',
    Indicator: 'span',
    Label: 'span',
  }
}, (props: CheckboxFeatureProps, { nodes }) => {
  const { Root, Input, Indicator, Label } = nodes

  const ref = useRef<HTMLLabelElement | null>(null)

  return (
    <Root
      ref={ref}
      role="checkbox"
      tabIndex={0}
      aria-checked={!!props.checked}
      className={classNames({
        'STATE_disabled': props.disabled,
      })}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            ref.current?.click()
            break
          default:
            // do nothing
        }
      }}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <Input
        type='checkbox'
        name={props.name}
        disabled={props.disabled}
        checked={props.checked === undefined ? undefined : props.checked}
        value={props.value}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            props.onChange && props.onChange(event.target.checked, event)
          }
        )}
      />
      <Indicator
        className={classNames({
          'STATE_checked': props.value,
        })}
      ></Indicator>
      {props.label && <Label>{props.label}</Label>}
    </Root>
  )
})

export type CheckboxProps = UUIFunctionComponentProps<typeof Checkbox>