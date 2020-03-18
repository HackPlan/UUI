import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';
import classNames from 'classnames';

import './Checkbox.scss';

export enum CheckboxNodeName {
  Checkbox = "checkbox",
  Root = "root",
  Input = "input",
  Indicator = "indicator",
  Label = "label",
}

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
>
export interface CheckboxProps extends InputHTMLAttributes, StylishProps<CheckboxNodeName> {
  label?: string | React.ReactNode
  value: boolean
  onChange: (value: boolean) => void
}

export function Checkbox(props: CheckboxProps) {

  // Initial Nodes
  const [
    Root,
    Input,
    Indicator,
    Label,
  ] = useMemo(() => {
    const stylished = initStylished(CheckboxNodeName.Checkbox, props, { prefix: "uui" })
    return [
      stylished.element('label', CheckboxNodeName.Root),
      stylished.element('input', CheckboxNodeName.Input),
      stylished.element('span', CheckboxNodeName.Indicator),
      stylished.element('span', CheckboxNodeName.Label),
    ]
  }, [])
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
          props.onChange(event.target.checked)
        }}
      />
      <Indicator className={classNames([
        props.value ? 'checked' : ''
      ])}></Indicator>
      <Label className="u-pl-2">{props.label}</Label>
    </Root>
  )
}

