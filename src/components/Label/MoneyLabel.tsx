import React from 'react';
import { omit } from 'lodash';
import accounting from 'accounting';
import { UUI } from '../../utils/uui';

export interface BaseMoneyLabelProps {
  /**
   * Money value to be displayed.
   */
  value: string | number;
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
  /**
   * Custom format
   * @reference http://openexchangerates.github.io/accounting.js/#documentation
   */
  format?: string;
}

export const MoneyLabel = UUI.FunctionComponent({
  name: 'MoneyLabel',
  nodes: {
    Root: 'label',
  }
}, (props: BaseMoneyLabelProps, nodes) => {
  const { Root } = nodes

  const text = accounting.formatMoney(props.value, omit(props, 'value'))
  return (
    <Root>{text}</Root>
  )
})

export type MoneyLabelProps = Parameters<typeof MoneyLabel>[0]
