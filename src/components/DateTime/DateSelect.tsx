import React, { useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps, UUIComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { getDay, startOfWeek, add, format, startOfMonth, set, getDate, isSameMonth, isAfter, isBefore, isSameDay } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { range, isArray } from 'lodash-es';

export interface DateSelectFeatureProps<
X extends true | false | boolean | undefined = undefined,
Y = (X extends undefined ? Date : (X extends true ? [Date, Date] : Date)),
T = Y | null,
> {
  year: number;
  month: number;

  value: T;
  onChange: (value: T) => void;
  isRange?: X;
}

export const DateSelectPropTypes = createComponentPropTypes<DateSelectFeatureProps<any>>({
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  value: ExtraPropTypes.nullable(PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]).isRequired),
  onChange: PropTypes.func.isRequired,
  isRange: PropTypes.bool,
})

const DateSelectNodes = {
  Root: 'div',
  Calendar: 'div',
  WeekGrid: 'div',
  WeekItem: 'div',
  DayGrid: 'div',
  DayItem: 'div',
} as const

const BaseDateSelect = UUIFunctionComponent({
  name: 'DateSelect',
  nodes: DateSelectNodes,
  propTypes: DateSelectPropTypes,
}, (props: DateSelectFeatureProps<boolean | undefined>, { nodes, NodeDataProps }) => {
  const {
    Root, Calendar,
    WeekGrid, WeekItem,
    DayGrid, DayItem,
  } = nodes

  const dateInfo = useMemo(() => {
    const yearMonth = set(new Date, { year: props.year, month: props.month-1 })

    const firstDayInMonth = startOfMonth(yearMonth)
    const weekdayOfFirstDayInMonth = getDay(firstDayInMonth)

    const weekdays = range(0, 7).map((i) => {
      let date = new Date(yearMonth)
      date = startOfWeek(date)
      date = add(date, { days: i })
      return {
        key: format(date, 'yyyy-MM-dd'),
        date: date,
        label: format(date, 'EEEEEE', { locale: zhCN }),
      };
    });

    const days = range(
      1 - weekdayOfFirstDayInMonth,
      1 - weekdayOfFirstDayInMonth + 6*7,
    ).map((i) => {
      const date = add(firstDayInMonth, { days: i - 1 })
      const selected = (() => {
        if (isRangeValue(props.value) && props.value !== null) {
          return isAfter(date, props.value[0]) && isBefore(date, props.value[1])
        } else if (isSingleValue(props.value) && props.value !== null) {
          return isSameDay(date, props.value)
        }
        return false;
      })()

      return {
        key: format(date, 'yyyy-MM-dd'),
        date: date,
        label: getDate(date),
        active: isSameMonth(yearMonth, date),
        selected: selected,
      }
    })

    return {
      yearMonth,
      weekdays,
      days
    }
  }, [props.year, props.month, props.value])

  return (
    <Root>
      <Calendar>
        <WeekGrid>
          {dateInfo.weekdays.map((weekday) => {
            return (
              <WeekItem key={weekday.key}>
                {weekday.label}
              </WeekItem>
            );
          })}
        </WeekGrid>
        <DayGrid>
          {dateInfo.days.map((day) => {
            return (
              <DayItem
                {...NodeDataProps({
                  'active': day.active,
                  'selected': day.selected,
                })}
                key={day.key}
                onClick={() => {
                  if (isSingleValue(props.value)) {
                    props.onChange(day.date)
                  }
                }}
              >
                {day.label}
              </DayItem>
            )
          })}
        </DayGrid>
      </Calendar>
    </Root>
  )
})

export function DateSelect<X extends true | false | boolean | undefined = undefined>(props: UUIComponentProps<DateSelectFeatureProps<X>, typeof DateSelectNodes>) {
  const _BaseDateSelect = BaseDateSelect as any
  return <_BaseDateSelect {...props} />
}
DateSelect.displayName = `<UUI> [GenericComponent] DateSelect`
export type DateSelectProps = UUIFunctionComponentProps<typeof DateSelect>

const isRangeValue = (value: any): value is DateSelectFeatureProps<true>['value'] => {
  return isArray(value)
}
const isSingleValue = (value: any): value is DateSelectFeatureProps<false>['value'] => {
  return !isArray(value)
}
