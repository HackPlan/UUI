import React, { useState, useCallback, useRef, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { YearMonthSelect as UUIYearMonthSelect } from './YearMonthSelect';
import { DateSelect as UUIDateSelect } from './DateSelect';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { isAfter, startOfMonth, add, isBefore, isSameMonth } from 'date-fns';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { usePendingValue } from '../../hooks/usePendingValue';
import { Icons } from '../../icons/Icons';
import { compact } from 'lodash-es';
import { formatDate, tryParseDateFromString } from './utils/DateUtils';

export type DateRangePickerValue = [Date, Date];
export type DateRangePickerShortCut = DateTimeShortcutOption<DateRangePickerValue>;
export interface DateRangePickerFeatureProps {
  value: DateRangePickerValue | null;
  onChange: (value: DateRangePickerValue | null) => void;
  shortcuts?: DateRangePickerShortCut[];
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export const DateRangePickerPropTypes = createComponentPropTypes<DateRangePickerFeatureProps>({
  value: ExtraPropTypes.nullable(PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired).isRequired),
  onChange: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  startPlaceholder: PropTypes.string,
  endPlaceholder: PropTypes.string,
})

interface DateRangePickerInnerValue {
  startYearMonth: Date;
  endYearMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  startInput: string;
  endInput: string;

}

export const DateRangePicker = UUIFunctionComponent({
  name: 'DateRangePicker',
  nodes: {
    Root: 'div',
    ConnectIcon: Icons.ArrowRight,
    CalendarIcon: Icons.Calendar,
    Popover: UUIPopover,
    TextField: UUITextField,
    Activator: 'div',
    Container: 'div',
    Toolbar: 'div',
    Main: 'div',
    StartSection: 'div',
    EndSection: 'div',
    YearMonthSelect: UUIYearMonthSelect,
    DateSelect: UUIDateSelect,
    DateTimeShortcut: UUIDateTimeShortcut,
  },
  propTypes: DateRangePickerPropTypes,
}, (props: DateRangePickerFeatureProps, { nodes }) => {
  const {
    Root, ConnectIcon, CalendarIcon, Popover, TextField,
    Activator, Container, Toolbar, Main, StartSection, EndSection,
    YearMonthSelect, DateSelect, DateTimeShortcut,
  } = nodes

  const startInputRef = useRef<HTMLInputElement | null>(null)
  const endInputRef = useRef<HTMLInputElement | null>(null)
  const [whichFocusing, setWhichFocusing] = useState<'start' | 'end'>()
  const [active, setActive] = useState(false)

  const [hoverDate, setHoverDate] = useState<Date>()

  const initialInnerValue = useMemo<DateRangePickerInnerValue>(() => {
    if (props.value === null) {
      return {
        startDate: null,
        endDate: null,
        startInput: '',
        endInput: '',
        startYearMonth: startOfMonth(new Date),
        endYearMonth: add(startOfMonth(new Date), { months: 1 }),
      }
    }
    return {
      startDate: props.value[0],
      endDate: props.value[1],
      startInput: formatDate(props.value[0]),
      endInput: formatDate(props.value[1]),
      startYearMonth: startOfMonth(props.value[0]),
      endYearMonth: isSameMonth(props.value[0], props.value[1]) ? add(startOfMonth(props.value[1]), { months: 1 }) : props.value[1],
    }
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<DateRangePickerInnerValue>(initialInnerValue, (value) => {
    if (value.startDate && value.endDate) {
      handleValueOnChange([value.startDate, value.endDate])
      setActive(false)
    }
  }, { resetWhenInitialValueChanged: true })

  const handleValueOnChange = useCallback((value: [Date, Date] | null) => {
    const sortedValue = value?.sort((i, j) => Number(i) - Number(j)) || null
    props.onChange(sortedValue)
  }, [props])
  /**
   *
   */
  const handleInputOnSubmit = useCallback((type: 'start' | 'end') => {
    if (innerValue.startDate && innerValue.endDate) {
      const originalInput = formatDate(props.value && (type === 'start' ? props.value[0] : props.value[1]))
      const input = type === 'start' ? innerValue.startInput : innerValue.endInput
      if (originalInput === input) return;
      try {
        if (input === '') {
          handleValueOnChange(null)
        } else {
          const result = tryParseDateFromString(input)
          handleValueOnChange(type === 'start' ? [result, innerValue.endDate] : [innerValue.startDate, result])
        }
      } catch {
        resetInnerValue()
      }
    }
  }, [handleValueOnChange, innerValue.endInput, innerValue.endDate, innerValue.startInput, innerValue.startDate, props.value, resetInnerValue])
  /**
   * handle user change year or month in YearMonthSelect.
   */
  const handleStartYearMonthSelect = useCallback((value: Date) => {
    setInnerValue((oldValue) => {
      const startYearMonthDate = value
      let endYearMonthDate = oldValue.endYearMonth
      if (!isBefore(startYearMonthDate, endYearMonthDate)) {
        endYearMonthDate = add(startYearMonthDate, { months: 1 })
      }
      return {
        ...oldValue,
        startYearMonth: startYearMonthDate,
        endYearMonth: endYearMonthDate,
      }
    })
  }, [setInnerValue])
  const handleEndYearMonthSelect = useCallback((value: Date) => {
    setInnerValue((oldValue) => {
      const endYearMonthDate = value
      let startYearMonthDate = oldValue.startYearMonth
      if (!isAfter(endYearMonthDate, startYearMonthDate)) {
        startYearMonthDate = add(endYearMonthDate, { months: -1 })
      }
      return {
        ...oldValue,
        startYearMonth: startYearMonthDate,
        endYearMonth: endYearMonthDate,
      }
    })
  }, [setInnerValue])
  /**
   * handle user select date in DateSelect.
   */
  const handleDateSelect = useCallback((value: Date) => {
    let shouldSubmit = false
    let newStartValue = innerValue.startDate
    let newEndValue = innerValue.endDate
    if (
      (newStartValue !== null && newEndValue !== null) ||
      (newStartValue === null && newEndValue === null)
    ) {
      if (whichFocusing === 'end') {
        newStartValue = null
        newEndValue = value
      } else {
        newStartValue = value
        newEndValue = null
      }
    } else {
      if (newStartValue === null) newStartValue = value
      if (newEndValue === null) newEndValue = value
      if (isAfter(newStartValue, newEndValue)) {
        const tmp = new Date(newStartValue)
        newStartValue = new Date(newEndValue)
        newEndValue = tmp
      }
      shouldSubmit = true
    }
    setInnerValue((oldValue) => {
      return {
        ...oldValue,
        startDate: newStartValue,
        startInput: formatDate(newStartValue),
        endDate: newEndValue,
        endInput: formatDate(newEndValue),
      }
    }, shouldSubmit)
  }, [innerValue.endDate, innerValue.startDate, setInnerValue, whichFocusing])

  return (
    <Root>
      <Popover
        placement={'bottom-start'}
        active={active}
        onClickAway={() => { setActive(false); resetInnerValue(); }}
        activator={
          <Activator
            onClick={() => {
              setActive(true)
              setTimeout(() => {
                if (whichFocusing === undefined && startInputRef.current) {
                  startInputRef.current.focus()
                }
              }, 0)
            }}
          >
            <TextField
              placeholder={props.startPlaceholder}
              value={innerValue.startInput}
              onChange={(value) => { setInnerValue((oldValue) => ({ ...oldValue, startInput: value })) }}
              customize={{
                Input: {
                  ref: startInputRef,
                  onFocus: () => {
                    setWhichFocusing('start')
                  },
                  onBlur: () => {
                    setWhichFocusing(undefined)
                    handleInputOnSubmit('start')
                  },
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      handleInputOnSubmit('start')
                    }
                  }
                }
              }}
            />
            <ConnectIcon />
            <TextField
              placeholder={props.endPlaceholder}
              value={innerValue.endInput}
              onChange={(value) => { setInnerValue((oldValue) => ({ ...oldValue, endInput: value })) }}
              customize={{
                Input: {
                  ref: endInputRef,
                  onFocus: () => {
                    setWhichFocusing('end')
                  },
                  onBlur: () => {
                    setWhichFocusing(undefined)
                    handleInputOnSubmit('end')
                  },
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      handleInputOnSubmit('end')
                    }
                  }
                }
              }}
            />
            <CalendarIcon />
          </Activator>
        }
      >
        <Container>
          <Toolbar>
            {props.shortcuts && (
              <DateTimeShortcut
                options={props.shortcuts}
                onSelect={(value) => {
                  handleValueOnChange(value)
                  setActive(false)
                }}
              />
            )}
          </Toolbar>
          <Main tabIndex={-1}>
            <StartSection>
              <YearMonthSelect
                value={innerValue.startYearMonth}
                onChange={handleStartYearMonthSelect}
              />
              <DateSelect
                yearMonth={innerValue.startYearMonth}
                selectedDates={compact([innerValue.startDate, innerValue.endDate])}
                onSelect={handleDateSelect}
                hoverDate={hoverDate}
                onHoverDateChange={(date) => { setHoverDate(date) }}
              />
            </StartSection>
            <EndSection>
              <YearMonthSelect
                value={innerValue.endYearMonth}
                onChange={handleEndYearMonthSelect}
              />
              <DateSelect
                yearMonth={innerValue.endYearMonth}
                selectedDates={compact([innerValue.startDate, innerValue.endDate])}
                onSelect={handleDateSelect}
                hoverDate={hoverDate}
                onHoverDateChange={(date) => { setHoverDate(date) }}
              />
            </EndSection>
          </Main>
        </Container>
      </Popover>
    </Root>
  )
})

export type DateRangePickerProps = UUIFunctionComponentProps<typeof DateRangePicker>