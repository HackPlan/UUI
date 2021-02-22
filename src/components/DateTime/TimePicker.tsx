import React, { useState, useCallback, useMemo, useRef } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { TimeSelect as UUITimeSelect } from './TimeSelect';
import { DateTimeShortcut as UUIDateTimeShortcut, DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { PickerButtons as UUIPickerButtons } from './PickerButtons';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';
import { tryParseTimeFromString, formatTime } from './utils/TimeUtils';
import { set } from 'date-fns';
import { getZeroDate } from './utils/DateTimeUtils';


export type TimePickerShortCut = DateTimeShortcutOption<Date>;
export interface TimePickerFeatureProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  shortcuts?: TimePickerShortCut[];
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}

export const TimePickerPropTypes = createComponentPropTypes<TimePickerFeatureProps>({
  value: ExtraPropTypes.nullable(PropTypes.instanceOf(Date).isRequired),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  shortcuts: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  confirmLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
})

interface TimePickerInnerValue {
  date: Date | null;
  input: string;
}

export const TimePicker = UUIFunctionComponent({
  name: 'TimePicker',
  nodes: {
    Root: 'div',
    ClockIcon: Icons.Clock,
    Popover: UUIPopover,
    TextField: UUITextField,
    Activator: 'div',
    Container: 'div',
    Toolbar: 'div',
    Main: 'div',
    TimeSelect: UUITimeSelect,
    DateTimeShortcut: UUIDateTimeShortcut,
    PickerButtons: UUIPickerButtons,
  },
  propTypes: TimePickerPropTypes,
}, (props: TimePickerFeatureProps, { nodes }) => {
  const {
    Root, ClockIcon, Popover, TextField,
    Activator, Container, Toolbar, Main,
    DateTimeShortcut, TimeSelect, PickerButtons,
  } = nodes

  const timeSelectRef = useRef<any | null>(null)
  const [active, setActive] = useState(false)

  const initialInnerValue = useMemo(() => {
    return {
      date: props.value,
      input: props.value === null ? '' : formatTime(props.value),
    }
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<TimePickerInnerValue>(initialInnerValue, (value) => {
    props.onChange(value.date)
  }, { resetWhenInitialValueChanged: true })

  const timeSelectScrollToValue = useCallback((value: Date, animate?: boolean) => {
    if (timeSelectRef.current) {
      timeSelectRef.current.scrollToValue(value, animate)
    }
  }, [])
  const openPopover = useCallback(() => { setActive(true) }, [])
  const closePopover = useCallback(() => { setActive(false) }, [])
  const handleValueOnChange = useCallback((value: Date | null) => {
    props.onChange(value)
  }, [props])
  const handleInputOnSubmit = useCallback(() => {
    const originalInput = formatTime(innerValue.date)
    const input = innerValue.input
    if (originalInput === input) return;
    try {
      if (input === '') {
        handleValueOnChange(null)
        timeSelectScrollToValue(getZeroDate())
      } else {
        const result = tryParseTimeFromString(input)
        handleValueOnChange(result)
        timeSelectScrollToValue(result)
      }
    } catch {
      resetInnerValue()
    }
  }, [handleValueOnChange, innerValue, resetInnerValue, timeSelectScrollToValue])
  const handleTimeSelect = useCallback((value: Date) => {
    setInnerValue((oldValue) => {
      const newDate = set(oldValue.date || getZeroDate(), {
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      })
      const newInput = formatTime(newDate)
      return { date: newDate, input: newInput }
    })
  }, [setInnerValue])
  const handleShortcutSelect = useCallback((date: Date) => {
    props.onChange(date)
    timeSelectScrollToValue(date || getZeroDate(), false)
    closePopover()
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
              onChange={(value) => { setInnerValue((oldValue) => ({ ...oldValue, input: value })) }}
              customize={{
                Root: {
                  onClick: () => {
                    openPopover()
                  }
                },
                Input: {
                  onBlur: () => {
                    handleInputOnSubmit()
                  },
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      handleInputOnSubmit()
                    }
                  }
                }
              }}
            />
            <ClockIcon />
          </Activator>
        }
      >
        <Container>
          <Toolbar>
            {props.shortcuts && (
              <DateTimeShortcut
                options={props.shortcuts}
                onSelect={handleShortcutSelect}
              />
            )}
          </Toolbar>
          <Main>
            <TimeSelect
              ref={timeSelectRef}
              value={innerValue.date || getZeroDate()}
              onChange={handleTimeSelect}
            />
            <PickerButtons
              confirmLabel={props.confirmLabel}
              cancelLabel={props.cancelLabel}
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
          </Main>
        </Container>
      </Popover>
    </Root>
  )
})

export type TimePickerProps = UUIFunctionComponentProps<typeof TimePicker>
