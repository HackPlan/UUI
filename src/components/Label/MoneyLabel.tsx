import React from 'react';
import { omit } from 'lodash';
import accounting from 'accounting';
import { UUI } from '../../utils/uui';

export interface BaseMoneyLabelProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  children: string
  symbol?: string
  precision?: number
  thousand?: string
  decimal?: string
  format?: string
}

export const MoneyLabel = UUI.FunctionComponent({
  name: 'MoneyLabel',
  nodes: {
    Root: 'label',
  }
}, (props: BaseMoneyLabelProps, nodes) => {
  const { Root } = nodes

  const text = accounting.formatMoney(props.children, omit(props, 'children'))
  return (
    <Root>{text}</Root>
  )
})

export type MoneyLabelProps = Parameters<typeof MoneyLabel>[0]
