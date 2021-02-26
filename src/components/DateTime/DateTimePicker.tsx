import React, { useState, useCallback, useRef, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { YearMonthSelect as UUIYearMonthSelect } from './YearMonthSelect';
import { DateSelect as UUIDateSelect } from './DateSelect';
import { TimeSelect as UUITimeSelect } from './TimeSelect';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';
import { formatDateTime, tryParseDateTimeFromString, getZeroDate } from './utils/DateTimeUtils';
import { set } from 'date-fns';
import { PickerButtons } from './PickerButtons';

export type DateTimePickerShortCut = DateTimeShortcutOption<Date>;
export interface DateTimePickerFeatureProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  shortcuts?: DateTimePickerShortCut[];
  placeholder?: string;
}

export const DateTimePickerPropTypes = createComponentPropTypes<DateTimePickerFeatureProps>({
  value: ExtraPropTypes.nullable(PropTypes.instanceOf(Date).isRequired),
  onChange: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  placeholder: PropTypes.string,
})

interface DateTimePickerInnerValue {
  date: Date | null;
  input: string;
}

export const DateTimePicker = UUIFunctionComponent({
  name: 'DateTimePicker',
  nodes: {
    Root: 'div',
    CalendarIcon: Icons.Calendar,
    Popover: UUIPopover,
    TextField: UUITextField,
    Activator: 'div',
    Container: 'div',
    Toolbar: 'div',
    Main: 'div',
    SelectZone: 'div',
    Section: 'div',
    YearMonthSelect: UUIYearMonthSelect,
    DateSelect: UUIDateSelect,
    TimeSelect: UUITimeSelect,
    DateTimeShortcut: UUIDateTimeShortcut,
  },
  propTypes: DateTimePickerPropTypes,
}, (props: DateTimePickerFeatureProps, { nodes }) => {
  const {
    Root, CalendarIcon, Popover, TextField,
    Activator, Container, Main, SelectZone, Section,
    YearMonthSelect, DateSelect, TimeSelect, DateTimeShortcut,
  } = nodes

  const timeSelectRef = useRef<any | null>(null)
  const [active, setActive] = useState(false)
  const [yearMonth, setYearMonth] = useState<Date>(props.value || new Date())

  const initialInnerValue = useMemo(() => {
    return {
      date: props.value,
      input: props.value === null ? '' : formatDateTime(props.value),
    }
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<DateTimePickerInnerValue>(initialInnerValue, (value) => {
    props.onChange(value.date)
  }, { resetWhenInitialValueChanged: true })

  const timeSelectScrollToValue = useCallback((value: Date, animate?: boolean) => {
    if (timeSelectRef.current) {
      timeSelectRef.current.scrollToValue(value, animate)
    }
  }, [])
  const openPopover = useCallback(() => { setActive(true) }, [])
  const closePopover = useCallback(() => { setActive(false) }, [])
  const handleUserValueChange = useCallback((value: Date | null) => {
    props.onChange(value)
    setYearMonth(value || new Date())
  }, [props])
  const handleUserInputChange = useCallback((value: string) => {
    if (value === '') {
      handleUserValueChange(null)
      timeSelectScrollToValue(getZeroDate())
    } else {
      setInnerValue((oldValue) => ({ ...oldValue, input: value }))
    }
  }, [handleUserValueChange, setInnerValue, timeSelectScrollToValue])
  const handleUserInputCommit = useCallback(() => {
    const input = innerValue.input
    if (input === '') return;
    const originalInput = formatDateTime(innerValue.date)
    if (originalInput === input) return;
    try {
      const result = tryParseDateTimeFromString(input)
      handleUserValueChange(result)
      timeSelectScrollToValue(result)
    } catch {
      resetInnerValue()
    }
  }, [handleUserValueChange, innerValue, resetInnerValue, timeSelectScrollToValue])
  const handleDateSelect = useCallback((value: Date) => {
    setInnerValue((oldValue) => {
      const newDate = set(oldValue.date || getZeroDate(), {
        year: value.getFullYear(),
        month: value.getMonth(),
        date: value.getDate(),
      })
      const newInput = formatDateTime(newDate)
      return { date: newDate, input: newInput }
    })
  }, [setInnerValue])
  const handleTimeSelect = useCallback((value: Date) => {
    setInnerValue((oldValue) => {
      const newDate = set(oldValue.date || new Date(), {
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
        milliseconds: value.getMilliseconds(),
      })
      const newInput = formatDateTime(newDate)
      return { date: newDate, input: newInput }
    })
  }, [setInnerValue])
  const handleShortcutSelect = useCallback((date: Date) => {
    props.onChange(date)
    timeSelectScrollToValue(date || getZeroDate(), false)
    setTimeout(() => { closePopover() }, 10)
  }, [closePopover, props, timeSelectScrollToValue])

  return (
    <Root>
      <Popover
        placement={'bottom-start'}
        active={active}
        onClickAway={() => {
          resetInnerValue();
          timeSelectScrollToValue(props.value || getZeroDate(), false)
          setTimeout(() => { closePopover() }, 10)
        }}
        activator={
          <Activator>
            <TextField
              placeholder={props.placeholder}
              value={innerValue.input}
              onChange={handleUserInputChange}
              customize={{
                Root: {
                  onClick: () => {
                    openPopover()
                  }
                },
                Input: {
                  onBlur: () => {
                    handleUserInputCommit()
                  },
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      handleUserInputCommit()
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
          <Main>
            {props.shortcuts && (
              <DateTimeShortcut
                options={props.shortcuts}
                onSelect={handleShortcutSelect}
              />
            )}
            <SelectZone>
              <YearMonthSelect
                value={yearMonth}
                onChange={(value) => { setYearMonth(value) }}
              />
              <Section>
                <DateSelect
                  yearMonth={yearMonth}
                  selectedDates={innerValue.date ? [innerValue.date] : []}
                  onSelect={handleDateSelect}
                />
                <TimeSelect
                  ref={timeSelectRef}
                  value={innerValue.date || getZeroDate()}
                  onChange={handleTimeSelect}
                />
              </Section>
            </SelectZone>
          </Main>
          <PickerButtons
            // confirmLabel={props.confirmLabel}
            // cancelLabel={props.cancelLabel}
            onCancel={() => {
              resetInnerValue()
              timeSelectScrollToValue(props.value || getZeroDate(), false)
              setTimeout(() => { closePopover() }, 10)
            }}
            onConfirm={() => {
              setInnerValue((value) => value, true)
              timeSelectScrollToValue(innerValue.date || getZeroDate(), false)
              setTimeout(() => { closePopover() }, 10)
            }}
          />
        </Container>
      </Popover>
    </Root>
  )
})

export type DateTimePickerProps = UUIFunctionComponentProps<typeof DateTimePicker>
