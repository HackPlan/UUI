import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';
import classNames from 'classnames';

import './BaseRadio.scss';

export enum BaseRadioNodeName {
  BaseRadio = "base-radio",
  Root = "root",
  Input = "input",
  Indicator = "indicator",
  Label = "label",
}

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
>
export interface BaseRadioProps extends InputHTMLAttributes, StylishProps<BaseRadioNodeName> {
  label?: string | React.ReactNode
}

export function BaseRadio(props: BaseRadioProps) {

  // Initial Nodes
  const [
    Root,
    Input,
    Indicator,
    Label,
  ] = useMemo(() => {
    const stylished = initStylished(BaseRadioNodeName.BaseRadio, props, { prefix: "uui" })
    return [
      stylished.element('label', BaseRadioNodeName.Root),
      stylished.element('input', BaseRadioNodeName.Input),
      stylished.element('span', BaseRadioNodeName.Indicator),
      stylished.element('span', BaseRadioNodeName.Label),
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

