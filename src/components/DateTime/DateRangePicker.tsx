import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { YearMonthSelect as UUIYearMonthSelect, YearMonthSelectValue } from './YearMonthSelect';
import { DateSelect as UUIDateSelect } from './DateSelect';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { format, parseISO, set, isAfter, startOfMonth, add, isBefore, isSameMonth } from 'date-fns';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { usePendingValue } from '../../hooks/usePendingValue';
import { Icons } from '../../icons/Icons';
import { compact } from 'lodash-es';

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

interface DateRangePickerPendingValue {
  startValue: Date | null;
  endValue: Date | null;
  startInput: string;
  endInput: string;
  startYearMonth: YearMonthSelectValue;
  endYearMonth: YearMonthSelectValue;
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

  const initialInnerValue = useMemo(() => {
    return getInnerValue(props.value)
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<DateRangePickerPendingValue>(initialInnerValue, (value) => {
    if (value.startValue && value.endValue) {
      handleValueOnChange([value.startValue, value.endValue])
      setActive(false)
    }
  })

  useEffect(() => {
    return setInnerValue(getInnerValue(props.value))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  const handleValueOnChange = useCallback((value: [Date, Date] | null) => {
    const sortedValue = value?.sort((i, j) => Number(i) - Number(j)) || null
    props.onChange(sortedValue)
  }, [props])
  /**
   *
   */
  const handleInputOnSubmit = useCallback((type: 'start' | 'end') => {
    if (innerValue.startValue && innerValue.endValue) {
      const originalInput = formatDate(props.value && (type === 'start' ? props.value[0] : props.value[1]))
      const input = type === 'start' ? innerValue.startInput : innerValue.endInput
      if (originalInput === input) return;
      try {
        if (input === '') {
          handleValueOnChange(null)
        } else {
          const result = tryParseDateFromString(input)
          handleValueOnChange(type === 'start' ? [result, innerValue.endValue] : [innerValue.startValue, result])
        }
      } catch {
        resetInnerValue()
      }
    }
  }, [handleValueOnChange, innerValue.endInput, innerValue.endValue, innerValue.startInput, innerValue.startValue, props.value, resetInnerValue])
  /**
   * handle user change year or month in YearMonthSelect.
   */
  const handleStartYearMonthSelect = useCallback((value: YearMonthSelectValue) => {
    setInnerValue((oldValue) => {
      const startYearMonthDate = getDateFromYearMonth(value)
      let endYearMonthDate = getDateFromYearMonth(oldValue.endYearMonth)
      if (!isBefore(startYearMonthDate, endYearMonthDate)) {
        endYearMonthDate = add(startYearMonthDate, { months: 1 })
      }
      return {
        ...oldValue,
        startYearMonth: getYearMonthFromDate(startYearMonthDate),
        endYearMonth: getYearMonthFromDate(endYearMonthDate),
      }
    })
  }, [setInnerValue])
  const handleEndYearMonthSelect = useCallback((value: YearMonthSelectValue) => {
    setInnerValue((oldValue) => {
      const endYearMonthDate = getDateFromYearMonth(value)
      let startYearMonthDate = getDateFromYearMonth(oldValue.startYearMonth)
      if (!isAfter(endYearMonthDate, startYearMonthDate)) {
        startYearMonthDate = add(endYearMonthDate, { months: -1 })
      }
      return {
        ...oldValue,
        startYearMonth: getYearMonthFromDate(startYearMonthDate),
        endYearMonth: getYearMonthFromDate(endYearMonthDate),
      }
    })
  }, [setInnerValue])
  /**
   * handle user select date in DateSelect.
   */
  const handleDateSelect = useCallback((value: Date) => {
    let shouldSubmit = false
    let newStartValue = innerValue.startValue
    let newEndValue = innerValue.endValue
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
        startValue: newStartValue,
        startInput: formatDate(newStartValue),
        endValue: newEndValue,
        endInput: formatDate(newEndValue),
      }
    }, shouldSubmit)
  }, [innerValue.endValue, innerValue.startValue, setInnerValue, whichFocusing])

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
                  console.log('shortcut selected', value)
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
                year={innerValue.startYearMonth.year}
                month={innerValue.startYearMonth.month}
                selectedDates={compact([innerValue.startValue, innerValue.endValue])}
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
                year={innerValue.endYearMonth.year}
                month={innerValue.endYearMonth.month}
                selectedDates={compact([innerValue.startValue, innerValue.endValue])}
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

function getDateFromYearMonth(value: YearMonthSelectValue) {
  return set(startOfMonth(new Date()), { year: value.year, month: value.month-1 })
}
function getYearMonthFromDate(date: Date | null) {
  return {
    year: (date || new Date()).getFullYear(),
    month: (date || new Date()).getMonth()+1,
  }
}
function formatDate(date: Date | null) {
  return date === null ? '' : format(date, 'yyyy-MM-dd')
}
function tryParseDateFromString(dateString: string) {
  const result = parseISO(dateString)
  if (isNaN(result.getTime())) throw new Error('date_string_parse_failed');
  return result
}
function getInnerValue(value: DateRangePickerValue | null): DateRangePickerPendingValue {
  if (value === null) {
    return {
      startValue: null,
      endValue: null,
      startInput: '',
      endInput: '',
      startYearMonth: getYearMonthFromDate(startOfMonth(new Date)),
      endYearMonth: getYearMonthFromDate(add(startOfMonth(new Date), { months: 1 })),
    }
  }
  return {
    startValue: value[0],
    endValue: value[1],
    startInput: formatDate(value[0]),
    endInput: formatDate(value[1]),
    startYearMonth: getYearMonthFromDate(startOfMonth(value[0])),
    endYearMonth: getYearMonthFromDate(isSameMonth(value[0], value[1]) ? add(startOfMonth(value[1]), { months: 1 }) : value[1]),
  }
}
