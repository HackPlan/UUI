import React, { useMemo, useCallback } from 'react';
import { format, set, add, Duration } from 'date-fns';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { Button as UUIButton } from '../Button/Button';
import { Icons } from '../../icons/Icons';

export interface YearMonthSelectValue {
  year: number;
  month: number;
}
export interface YearMonthSelectFeatureProps {
  value: YearMonthSelectValue;
  onChange: (value: YearMonthSelectValue) => void;
}

export const YearMonthSelectPropTypes = createComponentPropTypes<YearMonthSelectFeatureProps>({
  value: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  }),
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

  const dateInfo = useMemo(() => {
    const yearMonth = set(new Date, { year: props.value.year, month: props.value.month-1 })
    const yearLabel = format(yearMonth, 'yyyy')
    const monthLabel = format(yearMonth, 'M')

    return {
      yearMonth,
      yearLabel,
      monthLabel,
    }
  }, [props.value])

  const getNewValue = useCallback((offset: Duration) => {
    const date = add(dateInfo.yearMonth, offset)
    return {
      year: date.getFullYear(),
      month: date.getMonth()+1,
    }
  }, [dateInfo.yearMonth])

  return (
    <Root>
      <Container {...NodeDataProps({ 'type': 'actions' })}>
        <Button onClick={() => { props.onChange(getNewValue({ years: -1 })) }}>
          <ChevronsLeftIcon width={18} height={18} />
        </Button>
        <Button onClick={() => { props.onChange(getNewValue({ months: -1 })) }}>
          <ChevronLeftIcon width={14} height={14} />
        </Button>
      </Container>
      <Container {...NodeDataProps({ 'type': 'labels' })}>
        <YearLabel>{dateInfo.yearLabel}</YearLabel>
        <MonthLabel>{dateInfo.monthLabel}</MonthLabel>
      </Container>
      <Container {...NodeDataProps({ 'type': 'actions' })}>
        <Button onClick={() => { props.onChange(getNewValue({ months: 1 })) }}>
          <ChevronRightIcon width={14} height={14} />
        </Button>
        <Button onClick={() => { props.onChange(getNewValue({ years: 1 })) }}>
          <ChevronsRightIcon width={18} height={18} />
        </Button>
      </Container>
    </Root>
  )
})

export type YearMonthSelectProps = UUIFunctionComponentProps<typeof YearMonthSelect>
