import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';
import classNames from 'classnames';

import './Radio.scss';

export enum RadioNodeName {
  Radio = "radio",
  Root = "root",
  Input = "input",
  Indicator = "indicator",
  Label = "label",
}

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
>
export interface RadioProps<T extends string | number> extends InputHTMLAttributes, StylishProps<RadioNodeName> {
  value?: T
  label?: string | React.ReactNode
}

export function Radio<T extends string | number>(props: RadioProps<T>) {

  // Initial Nodes
  const [
    Root,
    Input,
    Indicator,
    Label,
  ] = useMemo(() => {
    const stylished = initStylished(RadioNodeName.Radio, props, { prefix: "uui" })
    return [
      stylished.element('label', RadioNodeName.Root),
      stylished.element('input', RadioNodeName.Input),
      stylished.element('span', RadioNodeName.Indicator),
      stylished.element('span', RadioNodeName.Label),
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
        {...omit(props, 'type')}
        type='radio'
      />
      <Indicator className={classNames([
        props.checked ? 'checked' : ''
      ])}></Indicator>
      <Label className="u-pl-2">{props.label}</Label>
    </Root>
  )
}

