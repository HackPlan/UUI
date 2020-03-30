import React from 'react';
import { omit } from 'lodash';
import { UUI } from '../../utils/uui';

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'min' | 'max' | 'type' |
  'value' | 'onChange'
>
export interface BaseNumberFieldProps extends InputHTMLAttributes {
  min?: number
  max?: number
  fixed?: number
  value: number | null | undefined
  onChange: (value: number | null, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const NumberField = UUI.FunctionComponent({
  name: 'NumberField',
  nodes: {
    Root: 'input'
  }
}, (props: BaseNumberFieldProps, nodes) => {
  const { Root } = nodes
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
})

export type NumberFieldProps = Parameters<typeof NumberField>[0]


function limitFixed(value: string, fixed?: number) {
  if (fixed === undefined) return value
  const dotIndex = value.indexOf('.')
  if (dotIndex === -1) return value
  return value.slice(0, dotIndex + (fixed === 0 ? 0 : 1 + fixed))
}
function limitRange(value: number, min?: number, max?: number) {
  return Math.min(Math.max(min || Number.MIN_VALUE, value), max || Number.MAX_VALUE)
}
