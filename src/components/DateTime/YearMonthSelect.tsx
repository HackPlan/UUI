import { add, format } from 'date-fns';
import React, { useCallback } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Icons } from '../../icons/Icons';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { Button as UUIButton } from '../Button/Button';
export interface YearMonthSelectFeatureProps {
  value: Date;
  onChange: (value: Date) => void;
}

export const YearMonthSelectPropTypes = createComponentPropTypes<YearMonthSelectFeatureProps>({
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
})

export const YearMonthSelect = UUIFunctionComponent({
  name: 'YearMonthSelect',
  nodes: {
    Root: 'div',
    Container: 'div',
    Button: UUIButton,
    YearLabel: 'div',
    MonthLabel: 'div',
    ChevronsLeftIcon: Icons.ChevronsLeft,
    ChevronLeftIcon: Icons.ChevronLeft,
    ChevronsRightIcon: Icons.ChevronsRight,
    ChevronRightIcon: Icons.ChevronRight,
  },
  propTypes: YearMonthSelectPropTypes,
}, (props: YearMonthSelectFeatureProps, { nodes, NodeDataProps }) => {
  const {
    Root, Container,
    Button, YearLabel, MonthLabel,
    ChevronLeftIcon, ChevronsLeftIcon, ChevronRightIcon, ChevronsRightIcon,
  } = nodes

  const yearLabel = format(props.value, 'yyyy')
  const monthLabel = format(props.value, 'M')

  const handleChange = useCallback((type: 'years' | 'months', value: number) => {
    props.onChange(add(props.value, { [type]: value }))
  }, [props])

  return (
    <Root>
      <Container {...NodeDataProps({ 'type': 'actions' })}>
        <Button onClick={() => { handleChange('years', -1) }}>
          <ChevronsLeftIcon width={18} height={18} />
        </Button>
        <Button onClick={() => { handleChange('months', -1) }}>
          <ChevronLeftIcon width={14} height={14} />
        </Button>
      </Container>
      <Container {...NodeDataProps({ 'type': 'labels' })}>
        <YearLabel>{yearLabel}</YearLabel>
        <MonthLabel>{monthLabel}</MonthLabel>
      </Container>
      <Container {...NodeDataProps({ 'type': 'actions' })}>
      <Button onClick={() => { handleChange('months', 1) }}>
          <ChevronRightIcon width={14} height={14} />
        </Button>
        <Button onClick={() => { handleChange('years', 1) }}>
          <ChevronsRightIcon width={18} height={18} />
        </Button>
      </Container>
    </Root>
  )
})

export type YearMonthSelectProps = UUIFunctionComponentProps<typeof YearMonthSelect>
