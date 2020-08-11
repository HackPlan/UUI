import React from 'react';
import { UUI } from '../../core/uui';
import { formatMoney } from '../../utils/moneyHelper';
import { numberAbbr, NumberAbbrUnit } from '../../utils/numberHelper';


export interface NumberAbbrLabelFeatureProps {
  /**
   * number value to be displayed.
   *
   */
  value: number;
  unit: NumberAbbrUnit;
  /**
   * The maximum number of decimals.
   * @default 2
   */
  maxPrecision?: number;
}

export const NumberAbbrLabel = UUI.FunctionComponent({
  name: 'NumberAbbrLabel',
  nodes: {
    Root: 'abbr',
  }
}, (props: NumberAbbrLabelFeatureProps, nodes) => {
  const { Root } = nodes

  const number = formatMoney(props.value, { symbol: '' })
  const abbr = numberAbbr(props.value, props.unit, props.maxPrecision || 2)

  return (
    <Root title={number}>{abbr}{props.unit}</Root>
  )
})

export type NumberAbbrLabelProps = Parameters<typeof NumberAbbrLabel>[0]