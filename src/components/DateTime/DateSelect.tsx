import React, { useMemo, useCallback } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { getDay, startOfWeek, add, format, startOfMonth, getDate, isSameMonth, isSameDay, isAfter, isBefore } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { range } from 'lodash-es';

export interface DateSelectFeatureProps {
  yearMonth: Date;

  selectedDates: Date[];
  onSelect: (date: Date) => void;
  hoverDate?: Date;
  onHoverDateChange?: (date: Date | undefined) => void;
}

export const DateSelectPropTypes = createComponentPropTypes<DateSelectFeatureProps>({
  yearMonth: PropTypes.instanceOf(Date).isRequired,
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired),
  onSelect: PropTypes.func.isRequired,
  hoverDate: PropTypes.instanceOf(Date),
  onHoverDateChange: PropTypes.func,
})

export const DateSelect = UUIFunctionComponent({
  name: 'DateSelect',
  nodes: {
    Root: 'div',
    Calendar: 'div',
    WeekGrid: 'div',
    WeekItem: 'div',
    DayGrid: 'div',
    DayItem: 'div',
  },
  propTypes: DateSelectPropTypes,
}, (props: DateSelectFeatureProps, { nodes, NodeDataProps }) => {
  const {
    Root, Calendar,
    WeekGrid, WeekItem,
    DayGrid, DayItem,
  } = nodes

  const betweenIncludeDates = useCallback((date: Date, range: [Date, Date] | Date[]) => {
    return !isBefore(date, range[0]) && !isAfter(date, range[1])
  }, [])

  const dateInfo = useMemo(() => {
    const firstDayInMonth = startOfMonth(props.yearMonth)
    const weekdayOfFirstDayInMonth = getDay(firstDayInMonth)

    const weekdays = range(0, 7).map((i) => {
      let date = new Date(props.yearMonth)
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
      const selected = props.selectedDates.findIndex((i) => isSameDay(date, i)) !== -1
      const inSelectedRange = (() => {
        if (props.selectedDates.length >= 2) {
          return betweenIncludeDates(date, props.selectedDates)
        }
        return false;
      })()
      return {
        key: format(date, 'yyyy-MM-dd'),
        date: date,
        label: getDate(date),
        active: isSameMonth(props.yearMonth, date),
        selected: selected,
        inSelectedRange: inSelectedRange,
      }
    })

    return {
      weekdays,
      days
    }
  }, [props.yearMonth, props.selectedDates, betweenIncludeDates])

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
        <DayGrid
          onMouseLeave={() => {
            props.onHoverDateChange && props.onHoverDateChange(undefined)
          }}
        >
          {dateInfo.days.map((day) => {
            const hovering = props.hoverDate ? isSameDay(day.date, props.hoverDate) : false
            const inHoverRange = (() => {
              if (props.selectedDates.length === 1 && props.hoverDate) {
                return betweenIncludeDates(day.date, [props.selectedDates[0], props.hoverDate].sort((i, j) => Number(i) - Number(j)))
              }
              return false
            })()
            return (
              <DayItem
                {...NodeDataProps({
                  'active': day.active,
                  'selected': day.selected,
                  'in-selected-range': day.inSelectedRange,
                  'in-hover-range': inHoverRange,
                  'hovering': hovering,
                })}
                key={day.key}
                onClick={() => {
                  props.onSelect(day.date)
                }}
                onMouseEnter={() => {
                  props.onHoverDateChange && props.onHoverDateChange(day.date)
                }}
                onMouseLeave={() => {
                  props.onHoverDateChange && props.onHoverDateChange(undefined)
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

export type DateSelectProps = UUIFunctionComponentProps<typeof DateSelect>
