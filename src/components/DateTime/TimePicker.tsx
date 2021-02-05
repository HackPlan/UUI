import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { TimeSelect as UUITimeSelect, TimeSelectValue } from './TimeSelect';
import { DateTimeShortcut as UUIDateTimeShortcut, DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { PickerButtons as UUIPickerButtons } from './PickerButtons';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';
import { getDateFromTimeValue, getTimeValue, formatTimeValue, tryParseTimeFromString } from './TimeUtils';


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

interface TimePickerPendingValue extends TimeSelectValue {
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
    return getInnerValue(props.value)
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<TimePickerPendingValue>(initialInnerValue, (value) => {
    props.onChange(getDateFromTimeValue(value))
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
  const handleValueOnChange = useCallback((value: Date | null) => {
    props.onChange(value)
  }, [props])
  const handleInputOnSubmit = useCallback(() => {
    const originalInput = formatTimeValue(innerValue)
    const input = innerValue.input
    if (originalInput === input) return;
    try {
      if (input === '') {
        handleValueOnChange(null)
        timeSelectScrollToValue(getTimeValue(null))
      } else {
        const result = tryParseTimeFromString(input)
        handleValueOnChange(result)
        timeSelectScrollToValue(getTimeValue(result))
      }
    } catch {
      resetInnerValue()
    }
  }, [handleValueOnChange, innerValue, resetInnerValue, timeSelectScrollToValue])
  const handleTimeSelect = useCallback((value: TimeSelectValue) => {
    setInnerValue((oldValue) => ({
      ...oldValue,
      ...value,
      input: formatTimeValue(value),
    }))
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
              value={innerValue}
              onChange={handleTimeSelect}
            />
            <PickerButtons
              confirmLabel={props.confirmLabel}
              cancelLabel={props.cancelLabel}
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
          </Main>
        </Container>
      </Popover>
    </Root>
  )
})

export function getInnerValue(date: Date | null): TimePickerPendingValue {
  const time = getTimeValue(date)
  return {
    ...time,
    input: date === null ? '' : formatTimeValue(time),
  }
}

export type TimePickerProps = UUIFunctionComponentProps<typeof TimePicker>
