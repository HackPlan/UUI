import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';
import accounting from 'accounting';

export enum MoneyLabelNodeName {
  MoneyLabel = "moneylabel",
  Root = "root",
}

export interface MoneyLabelProps extends React.HTMLAttributes<HTMLOrSVGElement>, StylishProps<MoneyLabelNodeName> {
  children: string
  symbol?: string
  precision?: number
  thousand?: string
  decimal?: string
  format?: string
}

export function MoneyLabel(props: MoneyLabelProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(MoneyLabelNodeName.MoneyLabel, props, { prefix: "uui" })
    return [
      stylished.element('label', MoneyLabelNodeName.Root),
    ]
  }, [])

  const text = accounting.formatMoney(props.children, omit(props, 'children'))

  return (
    <Root>{text}</Root>
  )
}

