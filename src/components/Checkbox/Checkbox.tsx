import React, { useRef } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { KeyCode } from '../../utils/keyboardHelper';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface CheckboxFeatureProps {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The label of checkbox.
   * @default none
   */
  label?: React.ReactNode;
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

export const CheckboxPropTypes = createComponentPropTypes<CheckboxFeatureProps>({
  name: PropTypes.string,
  label: PropTypes.node,
  checked: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
})

export const Checkbox = UUIFunctionComponent({
  name: 'Checkbox',
  nodes: {
    Root: 'label',
    Input: 'input',
    Indicator: 'span',
    Label: 'span',
  },
  propTypes: CheckboxPropTypes,
}, (props: CheckboxFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Input, Indicator, Label } = nodes

  const ref = useRef<HTMLLabelElement | null>(null)

  return (
    <Root
      {...NodeDataProps({
        'checked': !!props.checked,
        'disabled': !!props.disabled,
      })}
      aria-checked={!!props.checked}
      ref={ref}
      role="checkbox"
      tabIndex={0}
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
        checked={props.checked}
        value={props.value}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            props.onChange && props.onChange(event.target.checked, event)
          }
        )}
      />
      <Indicator></Indicator>
      {props.label && <Label>{props.label}</Label>}
    </Root>
  )
})

export type CheckboxProps = UUIFunctionComponentProps<typeof Checkbox>