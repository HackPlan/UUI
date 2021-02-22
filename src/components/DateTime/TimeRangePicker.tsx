import React, { useState, useCallback, useRef, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { TimeSelect as UUITimeSelect } from './TimeSelect';
import { PickerButtons as UUIPickerButtons } from './PickerButtons';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { usePendingValue } from '../../hooks/usePendingValue';
import { Icons } from '../../icons/Icons';
import { formatTime, tryParseTimeFromString } from './utils/TimeUtils';
import { set, isAfter } from 'date-fns';
import { getZeroDate } from './utils/DateTimeUtils';
import ReactHelper from '../../utils/ReactHelper';

export type TimeRangePickerValue = [Date, Date];
export type TimeRangePickerShortCut = DateTimeShortcutOption<TimeRangePickerValue>;
export interface TimeRangePickerFeatureProps {
  value: TimeRangePickerValue | null;
  onChange: (value: TimeRangePickerValue | null) => void;
  shortcuts?: TimeRangePickerShortCut[];
  startPlaceholder?: string;
  endPlaceholder?: string;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}

export const TimeRangePickerPropTypes = createComponentPropTypes<TimeRangePickerFeatureProps>({
  value: ExtraPropTypes.nullable(PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired).isRequired),
  onChange: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  startPlaceholder: PropTypes.string,
  endPlaceholder: PropTypes.string,
  confirmLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
})

interface TimeRangePickerInnerValue {
  startDate: Date | null;
  endDate: Date | null;
  startInput: string;
  endInput: string;
}

export const TimeRangePicker = UUIFunctionComponent({
  name: 'TimeRangePicker',
  nodes: {
    Root: 'div',
    ConnectIcon: Icons.ArrowRight,
    ClockIcon: Icons.Clock,
    Popover: UUIPopover,
    TextField: UUITextField,
    Activator: 'div',
    Container: 'div',
    Toolbar: 'div',
    Main: 'div',
    StartSection: 'div',
    EndSection: 'div',
    PickerButtons: UUIPickerButtons,
    TimeSelect: UUITimeSelect,
    DateTimeShortcut: UUIDateTimeShortcut,
  },
  propTypes: TimeRangePickerPropTypes,
}, (props: TimeRangePickerFeatureProps, { nodes }) => {
  const {
    Root, ConnectIcon, ClockIcon, Popover, TextField,
    Activator, Container, Toolbar, Main, StartSection, EndSection,
    TimeSelect, DateTimeShortcut, PickerButtons,
  } = nodes

  const startTimeSelectRef = useRef<any | null>(null)
  const endTimeSelectRef = useRef<any | null>(null)
  const startInputRef = useRef<HTMLInputElement | null>(null)
  const endInputRef = useRef<HTMLInputElement | null>(null)
  const [active, setActive] = useState(false)

  const initialInnerValue = useMemo(() => {
    if (props.value === null) {
      return {
        startDate: null,
        endDate: null,
        startInput: '',
        endInput: '',
      }
    }
    return {
      startDate: props.value[0],
      endDate: props.value[1],
      startInput: formatTime(props.value[0]),
      endInput: formatTime(props.value[1]),
    }
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<TimeRangePickerInnerValue>(initialInnerValue, (value) => {
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
  const handleValueOnChange = useCallback((value: TimeRangePickerValue | null) => {
    const sortedValue = value?.sort((i, j) => Number(i) - Number(j)) || null
    props.onChange(sortedValue)
  }, [props])

  /**
   *
   */
  const handleInputOnSubmit = useCallback((type: 'start' | 'end') => {
    if (innerValue.startDate && innerValue.endDate) {
      const originalInput = formatTime(type === 'start' ? innerValue.startDate : innerValue.endDate)
      const input = type === 'start' ? innerValue.startInput : innerValue.endInput
      if (originalInput === input) return;
      try {
        if (input === '') {
          handleValueOnChange(null)
        } else {
          const result = tryParseTimeFromString(input)
          handleValueOnChange(type === 'start' ? [result, innerValue.endDate] : [innerValue.startDate, result])
        }
      } catch {
        resetInnerValue()
      }
    }
  }, [handleValueOnChange, innerValue.endInput, innerValue.endDate, innerValue.startInput, innerValue.startDate, resetInnerValue])
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
        const newInput = formatTime(newDate)
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
                  onBlur: () => {
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
                  onBlur: () => {
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
            <ClockIcon />
          </Activator>
        }
      >
        <Container>
          <Main tabIndex={-1}>
            <Toolbar>
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
            </Toolbar>
            <StartSection>
              <TimeSelect
                ref={startTimeSelectRef}
                value={innerValue.startDate || getZeroDate()}
                onChange={handleTimeSelect('start')}
              />
            </StartSection>
            <EndSection>
              <TimeSelect
                ref={endTimeSelectRef}
                value={innerValue.endDate || getZeroDate()}
                onChange={handleTimeSelect('end')}
              />
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

export type TimeRangePickerProps = UUIFunctionComponentProps<typeof TimeRangePicker>
