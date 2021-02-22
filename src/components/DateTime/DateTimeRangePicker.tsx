import React, { useState, useCallback, useRef, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { YearMonthSelect as UUIYearMonthSelect } from './YearMonthSelect';
import { DateSelect as UUIDateSelect } from './DateSelect';
import { TimeSelect as UUITimeSelect } from './TimeSelect';
import { PickerButtons as UUIPickerButtons } from './PickerButtons';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { usePendingValue } from '../../hooks/usePendingValue';
import { Icons } from '../../icons/Icons';
import { set, isAfter, startOfMonth, add, isSameMonth, isBefore } from 'date-fns';
import { getZeroDate, formatDateTime, tryParseDateTimeFromString } from './utils/DateTimeUtils';
import ReactHelper from '../../utils/ReactHelper';
import { compact } from 'lodash-es';

export type DateTimeRangePickerValue = [Date, Date];
export type DateTimeRangePickerShortCut = DateTimeShortcutOption<DateTimeRangePickerValue>;
export interface DateTimeRangePickerFeatureProps {
  value: DateTimeRangePickerValue | null;
  onChange: (value: DateTimeRangePickerValue | null) => void;
  shortcuts?: DateTimeRangePickerShortCut[];
  startPlaceholder?: string;
  endPlaceholder?: string;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}

export const DateTimeRangePickerPropTypes = createComponentPropTypes<DateTimeRangePickerFeatureProps>({
  value: ExtraPropTypes.nullable(PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired).isRequired),
  onChange: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  startPlaceholder: PropTypes.string,
  endPlaceholder: PropTypes.string,
  confirmLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
})

interface DateTimeRangePickerInnerValue {
  startYearMonth: Date;
  endYearMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  startInput: string;
  endInput: string;
}

export const DateTimeRangePicker = UUIFunctionComponent({
  name: 'DateTimeRangePicker',
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
    Section: 'div',
    PickerButtons: UUIPickerButtons,
    YearMonthSelect: UUIYearMonthSelect,
    DateSelect: UUIDateSelect,
    TimeSelect: UUITimeSelect,
    DateTimeShortcut: UUIDateTimeShortcut,
  },
  propTypes: DateTimeRangePickerPropTypes,
}, (props: DateTimeRangePickerFeatureProps, { nodes }) => {
  const {
    Root, ConnectIcon, CalendarIcon, Popover, TextField,
    Activator, Container, Main, StartSection, EndSection, Section,
    YearMonthSelect, DateSelect, TimeSelect, DateTimeShortcut, PickerButtons,
  } = nodes

  const startTimeSelectRef = useRef<any | null>(null)
  const endTimeSelectRef = useRef<any | null>(null)
  const startInputRef = useRef<HTMLInputElement | null>(null)
  const endInputRef = useRef<HTMLInputElement | null>(null)
  const [active, setActive] = useState(false)
  const [whichFocusing, setWhichFocusing] = useState<'start' | 'end'>()
  const [hoverDate, setHoverDate] = useState<Date>()

  const initialInnerValue = useMemo(() => {
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
      startInput: formatDateTime(props.value[0]),
      endInput: formatDateTime(props.value[1]),
      startYearMonth: startOfMonth(props.value[0]),
      endYearMonth: isSameMonth(props.value[0], props.value[1]) ? add(startOfMonth(props.value[1]), { months: 1 }) : props.value[1],
    }
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<DateTimeRangePickerInnerValue>(initialInnerValue, (value) => {
    if (value.startDate && value.endDate) {
      handleValueOnChange([value.startDate, value.endDate])
      closePopover()
    }
  }, { resetWhenInitialValueChanged: true })

  const timeSelectScrollToValue = useCallback((type: 'start' | 'end', value: Date, animate?: boolean) => {
    if (type === 'start' && startTimeSelectRef.current) {
      startTimeSelectRef.current.scrollToValue(value, animate)
    }
    if (type === 'end' && endTimeSelectRef.current) {
      endTimeSelectRef.current.scrollToValue(value, animate)
    }
  }, [])
  const openPopover = useCallback(() => { setActive(true) }, [])
  const closePopover = useCallback(() => { setActive(false) }, [])
  const handleValueOnChange = useCallback((value: DateTimeRangePickerValue | null) => {
    const sortedValue = value?.sort((i, j) => Number(i) - Number(j)) || null
    props.onChange(sortedValue)
  }, [props])

  /**
   *
   */
  const handleInputOnSubmit = useCallback((type: 'start' | 'end') => {
    if (innerValue.startDate && innerValue.endDate) {
      const originalInput = formatDateTime(type === 'start' ? innerValue.startDate : innerValue.endDate)
      const input = type === 'start' ? innerValue.startInput : innerValue.endInput
      if (originalInput === input) return;
      try {
        if (input === '') {
          handleValueOnChange(null)
        } else {
          const result = tryParseDateTimeFromString(input)
          handleValueOnChange(type === 'start' ? [result, innerValue.endDate] : [innerValue.startDate, result])
        }
      } catch {
        resetInnerValue()
      }
    }
  }, [handleValueOnChange, innerValue.endInput, innerValue.endDate, innerValue.startInput, innerValue.startDate, resetInnerValue])
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
    }
    setInnerValue((oldValue) => {
      return {
        ...oldValue,
        startDate: newStartValue,
        startInput: formatDateTime(newStartValue),
        endDate: newEndValue,
        endInput: formatDateTime(newEndValue),
      }
    })
  }, [innerValue.endDate, innerValue.startDate, setInnerValue, whichFocusing])
  /**
   * handle user select date in TimeSelect.
   */
  const handleTimeSelect = useCallback((type: 'start' | 'end') => {
    return (value: Date) => {
      setInnerValue((oldValue) => {
        const oldDate = type === 'start' ? oldValue.startDate : oldValue.endDate
        const newDate = set(oldDate || getZeroDate(), {
          hours: value.getHours(),
          minutes: value.getMinutes(),
          seconds: value.getSeconds(),
        })
        const newInput = formatDateTime(newDate)
        return {
          ...oldValue,
          ...(type === 'start' ? {
            startDate: newDate,
            startInput: newInput,
          } : {}),
          ...(type === 'end' ? {
            endDate: newDate,
            endInput: newInput,
          } : {}),
        }
      })
    }
  }, [setInnerValue])

  return (
    <Root>
      <Popover
        placement={'bottom-start'}
        active={active}
        onClickAway={() => {
          resetInnerValue();
          timeSelectScrollToValue('start', props.value ? props.value[0] : getZeroDate(), false)
          timeSelectScrollToValue('end', props.value ? props.value[1] : getZeroDate(), false)
          setTimeout(() => { closePopover() }, 10)
        }}
        activator={
          <Activator
            onClick={() => {
              openPopover()
              setTimeout(() => {
                const focusedElement = ReactHelper.document?.activeElement
                if (startInputRef.current === focusedElement || endInputRef.current === focusedElement) return;
                if (startInputRef.current) {
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
          <Main tabIndex={-1}>
            {props.shortcuts && (
              <DateTimeShortcut
                options={props.shortcuts}
                onSelect={(value) => {
                  handleValueOnChange(value)
                  timeSelectScrollToValue('start', value ? value[0] : getZeroDate(), false)
                  timeSelectScrollToValue('end', value ? value[1] : getZeroDate(), false)
                  closePopover()
                }}
              />
            )}
            <StartSection>
              <YearMonthSelect
                value={innerValue.startYearMonth}
                onChange={handleStartYearMonthSelect}
              />
              <Section>
                <DateSelect
                  yearMonth={innerValue.startYearMonth}
                  selectedDates={compact([innerValue.startDate, innerValue.endDate])}
                  onSelect={handleDateSelect}
                  hoverDate={hoverDate}
                  onHoverDateChange={(date) => { setHoverDate(date) }}
                />
                <TimeSelect
                  ref={startTimeSelectRef}
                  value={innerValue.startDate || getZeroDate()}
                  onChange={handleTimeSelect('start')}
                />
              </Section>
            </StartSection>
            <EndSection>
              <YearMonthSelect
                value={innerValue.endYearMonth}
                onChange={handleEndYearMonthSelect}
              />
              <Section>
                <DateSelect
                  yearMonth={innerValue.endYearMonth}
                  selectedDates={compact([innerValue.startDate, innerValue.endDate])}
                  onSelect={handleDateSelect}
                  hoverDate={hoverDate}
                  onHoverDateChange={(date) => { setHoverDate(date) }}
                />
                <TimeSelect
                  ref={endTimeSelectRef}
                  value={innerValue.endDate || getZeroDate()}
                  onChange={handleTimeSelect('end')}
                />
              </Section>
            </EndSection>
          </Main>
          <PickerButtons
            confirmLabel={props.confirmLabel}
            cancelLabel={props.cancelLabel}
            onCancel={() => {
              resetInnerValue()
              timeSelectScrollToValue('start', props.value ? props.value[0] : getZeroDate(), false)
              timeSelectScrollToValue('end', props.value ? props.value[1] : getZeroDate(), false)
              setTimeout(() => { closePopover() }, 10)
            }}
            onConfirm={() => {
              setInnerValue((value) => value, true)
              if (innerValue.startDate && innerValue.endDate) {
                let data = [innerValue.startDate, innerValue.endDate]
                if (isAfter(innerValue.startDate, innerValue.endDate)) {
                  data = data.reverse()
                }
                timeSelectScrollToValue('start', data[0], false)
                timeSelectScrollToValue('end', data[1], false)
              } else {
                timeSelectScrollToValue('start', getZeroDate(), false)
                timeSelectScrollToValue('end', getZeroDate(), false)
              }
              setTimeout(() => { closePopover() }, 10)
            }}
          />
        </Container>
      </Popover>
    </Root>
  )
})

export type DateTimeRangePickerProps = UUIFunctionComponentProps<typeof DateTimeRangePicker>
