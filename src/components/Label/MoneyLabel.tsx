import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { formatMoney } from '../../utils/moneyHelper';

export interface MoneyLabelFeatureProps {
  /**
   * Money value to be displayed.
   */
  value: number;
  /**
   * The symbopl of currency
   * @default $
   */
  symbol?: string;
  /**
   * The maximum number of decimals.
   */
  precision?: number;
  /**
   * Thousands separator
   * @default ,
   */
  thousand?: string;
  /**
   * Decimal separator
   * @default .
   */
  decimal?: string;
}

export const MoneyLabel = UUI.FunctionComponent({
  name: 'MoneyLabel',
  nodes: {
    Root: 'label',
  }
}, (props: MoneyLabelFeatureProps, nodes) => {
  const { Root } = nodes

  const finalProps = {
    symbol: props.symbol || '$',
    thousand: props.thousand || ',',
    decimal: props.decimal || '.',
    precision: props.precision || 2,
  }

  const text = useMemo(() => formatMoney(props.value, finalProps), [finalProps, props.value])

  return (
    <Root>{text}</Root>
  )
})

export type MoneyLabelProps = Parameters<typeof MoneyLabel>[0]
