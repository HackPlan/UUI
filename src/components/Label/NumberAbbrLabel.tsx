import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { formatMoney } from '../../utils/moneyHelper';
import { numberAbbr, NumberAbbrUnit, NumberAbbrUnitValue } from '../../utils/numberHelper';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';


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

export const NumberAbbrLabelPropTypes = createComponentPropTypes<NumberAbbrLabelFeatureProps>({
  value: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(Object.keys(NumberAbbrUnitValue)).isRequired,
  maxPrecision: PropTypes.number,
})

export const NumberAbbrLabel = UUIFunctionComponent({
  name: 'NumberAbbrLabel',
  nodes: {
    Root: 'abbr',
  },
  propTypes: NumberAbbrLabelPropTypes,
}, (props: NumberAbbrLabelFeatureProps, { nodes }) => {
  const { Root } = nodes

  const number = formatMoney(props.value, { symbol: '' })
  const abbr = numberAbbr(props.value, props.unit, props.maxPrecision || 2)

  return (
    <Root title={number}>{abbr}{props.unit}</Root>
  )
})

export type NumberAbbrLabelProps = UUIFunctionComponentProps<typeof NumberAbbrLabel>