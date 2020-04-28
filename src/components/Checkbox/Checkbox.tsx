import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';

import './Checkbox.scss';
import { UUI } from '../../utils/uui';

export interface BaseCheckboxProps {
  /**
   * The label of checkbox.
   * @default none
   */
  label?: React.ReactNode | string;
  /**
   * Whether this checkbox is selected.
   */
  value: boolean;
  /**
   * Callback invoked when user changes select state.
   * @default none
   */
  onChange: (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
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
      className={classNames("u-flex u-flex-row u-items-center u-block", {
        'u-cursor-pointer': !props.disabled,
        'u-cursor-not-allowed': props.disabled,
      })}
    >
      <Input
        {...omit(props, 'type', 'value', 'onChange')}
        type='checkbox'
        checked={props.value}
        onChange={(event) => {
          props.onChange(event.target.checked, event)
        }}
      />
      <Indicator className={classNames([
        props.value ? 'checked' : ''
      ])}></Indicator>
      <Label className="u-pl-2">{props.label}</Label>
    </Root>
  )
})

export type CheckboxProps = Parameters<typeof Checkbox>[0]