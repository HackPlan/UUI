import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { YearMonthSelect as UUIYearMonthSelect, YearMonthSelectValue } from './YearMonthSelect';
import { DateSelect as UUIDateSelect } from './DateSelect';
import { TimeSelect as UUITimeSelect, TimeSelectValue } from './TimeSelect';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';
import { formatDateTime, tryParseDateTimeFromString, getDay as getDate } from './utils/DateTimeUtils';
import { getYearMonth } from './utils/YearMonthUtils';
import { getTimeValue } from './utils/TimeUtils';
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

type DateTimePickerPendingValue = TimeSelectValue & YearMonthSelectValue & {
  date?: number;
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
  const [yearMonth, setYearMonth] = useState<YearMonthSelectValue>(getYearMonth(props.value))

  const initialInnerValue = useMemo(() => {
    return getInnerValue(props.value)
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<DateTimePickerPendingValue>(initialInnerValue, (value) => {
    props.onChange(getDateFromInnerValue(value))
  })

  useEffect(() => {
    setInnerValue(getInnerValue(props.value))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  const timeSelectScrollToValue = useCallback((value: TimeSelectValue, animate?: boolean) => {
    if (timeSelectRef.current) {
      timeSelectRef.current.scrollToValue(value, animate)
    }
  }, [])
  const openPopover = useCallback(() => { setActive(true) }, [])
  const closePopover = useCallback(() => {
    timeSelectScrollToValue(getTimeValue(props.value), false)
    setActive(false)
  }, [props.value, timeSelectScrollToValue])
  const handleUserValueChange = useCallback((date: Date | null) => {
    props.onChange(date)
    setYearMonth(getYearMonth(date))
  }, [props])
  const handleUserInputChange = useCallback((value: string) => {
    if (value === '') {
      handleUserValueChange(null)
      timeSelectScrollToValue(getTimeValue(null))
    } else {
      setInnerValue((oldValue) => ({ ...oldValue, input: value }))
    }
  }, [handleUserValueChange, setInnerValue, timeSelectScrollToValue])
  const handleUserInputCommit = useCallback(() => {
    const input = innerValue.input
    if (input === '') return;
    const originalInput = formatDateTime(getDateFromInnerValue(innerValue))
    if (originalInput === input) return;
    try {
      const result = tryParseDateTimeFromString(input)
      handleUserValueChange(result)
      timeSelectScrollToValue(getTimeValue(result))
    } catch {
      resetInnerValue()
    }
  }, [handleUserValueChange, innerValue, resetInnerValue, timeSelectScrollToValue])
  const handleDateSelect = useCallback((value: Date) => {
    setInnerValue((oldValue) => {
      const newValue = {
        ...oldValue,
        ...getYearMonth(value),
        date: getDate(value),
      }
      const newInput = formatDateTime(getDateFromInnerValue(newValue))
      return { ...newValue, input: newInput }
    })
  }, [setInnerValue])
  const handleTimeSelect = useCallback((value: TimeSelectValue) => {
    setInnerValue((oldValue) => {
      const newValue = { ...oldValue, ...value, }
      return {
        ...newValue,
        input: formatDateTime(getDateFromInnerValue(newValue)),
      }
    })
  }, [setInnerValue])
  const handleShortcutSelect = useCallback((date: Date) => {
    props.onChange(date)
    closePopover()
  }, [closePopover, props])

  return (
    <Root>
      <Popover
        placement={'bottom-start'}
        active={active}
        onClickAway={() => { closePopover(); resetInnerValue(); }}
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
                  selectedDates={[getDateFromInnerValue(innerValue)]}
                  onSelect={handleDateSelect}
                />
                <TimeSelect
                  ref={timeSelectRef}
                  value={innerValue}
                  onChange={handleTimeSelect}
                />
              </Section>
            </SelectZone>
          </Main>
          <PickerButtons
            // confirmLabel={props.confirmLabel}
            // cancelLabel={props.cancelLabel}
            onCancel={() => {
              closePopover()
              resetInnerValue()
            }}
            onConfirm={() => {
              setInnerValue((value) => value, true)
              setTimeout(() => {
                closePopover()
              }, 100)
            }}
          />
        </Container>
      </Popover>
    </Root>
  )
})

function getInnerValue(date: Date | null): DateTimePickerPendingValue {
  const yearMonth = getYearMonth(date)
  const day = getDate(date)
  const time = getTimeValue(date)
  return {
    ...yearMonth,
    ...time,
    date: day,
    input: date === null ? '' : formatDateTime(date),
  }
}
function getDateFromInnerValue(innerValue: DateTimePickerPendingValue) {
  return set(new Date(0), {
    year: innerValue.year,
    month: innerValue.month-1,
    date: innerValue.date,
    hours: innerValue.hour,
    minutes: innerValue.minute,
    seconds: innerValue.second,
  })
}

export type DateTimePickerProps = UUIFunctionComponentProps<typeof DateTimePicker>
