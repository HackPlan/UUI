import React, { useState, useCallback, useEffect } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { YearMonthSelect as UUIYearMonthSelect, YearMonthSelectValue } from './YearMonthSelect';
import { DateSelect as UUIDateSelect } from './DateSelect';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { format, parseISO } from 'date-fns';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { Icons } from '../../icons/Icons';

export type DatePickerShortCut = DateTimeShortcutOption<Date>;
export interface DatePickerFeatureProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  shortcuts?: DatePickerShortCut[];
  placeholder?: string;
}

export const DatePickerPropTypes = createComponentPropTypes<DatePickerFeatureProps>({
  value: ExtraPropTypes.nullable(PropTypes.instanceOf(Date).isRequired),
  onChange: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  placeholder: PropTypes.string,
})

export const DatePicker = UUIFunctionComponent({
  name: 'DatePicker',
  nodes: {
    Root: 'div',
    CalendarIcon: Icons.Calendar,
    Popover: UUIPopover,
    TextField: UUITextField,
    Activator: 'div',
    Container: 'div',
    Toolbar: 'div',
    Main: 'div',
    YearMonthSelect: UUIYearMonthSelect,
    DateSelect: UUIDateSelect,
    DateTimeShortcut: UUIDateTimeShortcut,
  },
  propTypes: DatePickerPropTypes,
}, (props: DatePickerFeatureProps, { nodes }) => {
  const {
    Root, CalendarIcon, Popover, TextField,
    Activator, Container, Toolbar, Main,
    YearMonthSelect, DateSelect, DateTimeShortcut,
  } = nodes

  const [active, setActive] = useState(false)
  const [yearMonth, setYearMonth] = useState<YearMonthSelectValue>(getYearMonth(props.value))

  const [input, setInput] = useState(formatDate(props.value))
  useEffect(() => {
    setInput(formatDate(props.value))
  }, [props.value])

  const handleUserValueChange = useCallback((date: Date | null) => {
    props.onChange(date)
    setYearMonth(getYearMonth(date))
  }, [props])
  const handleUserInputCommit = useCallback(() => {
    const originalInput = formatDate(props.value)
    if (originalInput === input) return;
    try {
      if (input === '') {
        handleUserValueChange(null)
      } else {
        const result = tryParseDateFromString(input)
        handleUserValueChange(result)
      }
    } catch {
      setInput(formatDate(props.value))
    }
  }, [handleUserValueChange, input, props.value])
  const handleOnSelect = useCallback((value: Date) => {
    handleUserValueChange(value)
    setTimeout(() => {
      setActive(false)
    }, 100)
  }, [handleUserValueChange])

  return (
    <Root>
      <Popover
        placement={'bottom-start'}
        active={active}
        onClickAway={() => { setActive(false) }}
        activator={
          <Activator>
            <TextField
              placeholder={props.placeholder}
              value={input}
              onChange={(value) => { setInput(value) }}
              customize={{
                Root: {
                  onClick: () => {
                    setActive(true)
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
          <Toolbar>
            {props.shortcuts && (
              <DateTimeShortcut
                options={props.shortcuts}
                onSelect={handleOnSelect}
              />
            )}
          </Toolbar>
          <Main>
            <YearMonthSelect
              value={yearMonth}
              onChange={(value) => { setYearMonth(value) }}
            />
            <DateSelect
              year={yearMonth.year}
              month={yearMonth.month}
              selectedDates={props.value ? [props.value] : []}
              onSelect={handleOnSelect}
            />
          </Main>
        </Container>
      </Popover>
    </Root>
  )
})

function getYearMonth(date: Date | null) {
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

export type DatePickerProps = UUIFunctionComponentProps<typeof DatePicker>
