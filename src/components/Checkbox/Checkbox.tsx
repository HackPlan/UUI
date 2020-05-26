import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { UUI } from '../../core/uui';

export interface BaseCheckboxProps {
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
}

export const Checkbox = UUI.FunctionComponent({
  name: 'Checkbox',
  nodes: {
    Root: 'label',
    Input: 'input',
    Indicator: 'span',
    Label: 'span',
  }
}, (props: BaseCheckboxProps, nodes) => {
  const { Root, Input, Indicator, Label } = nodes

  return (
    <Root
      className={classNames({
        'disabled': props.disabled,
      })}
    >
      <Input
        {...omit(props, 'type', 'value', 'onChange', 'customize')}
        type='checkbox'
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
          'checked': props.value,
        })}
      ></Indicator>
      <Label>{props.label}</Label>
    </Root>
  )
})

export type CheckboxProps = Parameters<typeof Checkbox>[0]