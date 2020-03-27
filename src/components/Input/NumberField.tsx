import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';

export enum NumberFieldNodeName {
  NumberField = "numberfield",
  Root = "root",
}

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'min' | 'max' | 'type' |
  'value' | 'onChange'
>
export interface NumberFieldProps extends InputHTMLAttributes, StylishProps<NumberFieldNodeName> {
  min?: number
  max?: number
  fixed?: number
  value: number | null | undefined
  onChange: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function NumberField(props: NumberFieldProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(NumberFieldNodeName.NumberField, props, { prefix: "uui" })
    return [
      stylished.element('input', NumberFieldNodeName.Root),
    ]
  }, [])

  return (
    <Root
      {...omit(props, 'value', 'onChange')}
      type='number'
      className={"u-w-full u-p-2 u-border u-border-black"}
      value={props.value || ''}
      onChange={(event) => {
        let value = event.target.value
        value = limitFixed(value, props.fixed)
        let finalValue = parseFloat(value)
        if (isNaN(finalValue)) {
          props.onChange(null, event)
        } else {
          finalValue = limitRange(finalValue, props.min, props.max)
          props.onChange(finalValue, event)
        }
      }}
    />
  )
}


function limitFixed(value: string, fixed?: number) {
  if (fixed === undefined) return value
  const dotIndex = value.indexOf('.')
  if (dotIndex === -1) return value
  return value.slice(0, dotIndex + (fixed === 0 ? 0 : 1 + fixed))
}
function limitRange(value: number, min?: number, max?: number) {
  return Math.min(Math.max(min || Number.MIN_VALUE, value), max || Number.MAX_VALUE)
}
