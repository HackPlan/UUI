import React from 'react';
import { omit } from 'lodash';
import accounting from 'accounting';
import { UUI } from '../../utils/uui';

export interface MoneyLabelProps extends React.HTMLAttributes<HTMLOrSVGElement> {
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
}, (props: MoneyLabelProps, nodes) => {
  const { Root } = nodes

  const text = accounting.formatMoney(props.children, omit(props, 'children'))
  return (
    <Root>{text}</Root>
  )
})

