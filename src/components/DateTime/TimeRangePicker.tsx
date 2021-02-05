import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';
import { DateTimeShortcut as UUIDateTimeShortcut } from './DateTimeShortcut';
import { TimeSelect as UUITimeSelect, TimeSelectValue } from './TimeSelect';
import { PickerButtons as UUIPickerButtons } from './PickerButtons';
import { Popover as UUIPopover } from '../Popover/Popover';
import { TextField as UUITextField } from '../Input/TextField';
import { DateTimeShortcutOption, DateTimeShortcutOptionPropTypes } from './DateTimeShortcut';
import { usePendingValue } from '../../hooks/usePendingValue';
import { Icons } from '../../icons/Icons';
import { getTimeValue, formatTimeFromDate, getDateFromTimeValue, tryParseTimeFromString, formatTimeValue } from './TimeUtils';

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

interface TimeRangePickerPendingValue {
  startValue: TimeSelectValue | null;
  endValue: TimeSelectValue | null;
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
    return getInnerValue(props.value)
  }, [props.value])
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue<TimeRangePickerPendingValue>(initialInnerValue, (value) => {
    if (value.startValue && value.endValue) {
      handleValueOnChange([getDateFromTimeValue(value.startValue), getDateFromTimeValue(value.endValue)])
      closePopover()
    }
  })

  useEffect(() => {
    return setInnerValue(getInnerValue(props.value))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  const timeSelectScrollToValue = useCallback((type: 'start' | 'end', value: TimeSelectValue, animate?: boolean) => {
    if (type === 'start' && startTimeSelectRef.current) {
      startTimeSelectRef.current.scrollToValue(value, animate)
    }
    if (type === 'end' && endTimeSelectRef.current) {
      endTimeSelectRef.current.scrollToValue(value, animate)
    }
  }, [])
  const openPopover = useCallback(() => { setActive(true) }, [])
  const closePopover = useCallback(() => {
    timeSelectScrollToValue('start', getTimeValue(props.value ? props.value[0] : null), false)
    timeSelectScrollToValue('end', getTimeValue(props.value ? props.value[1] : null), false)
    setActive(false)
  }, [props.value, timeSelectScrollToValue])
  const handleValueOnChange = useCallback((value: [Date, Date] | null) => {
    const sortedValue = value?.sort((i, j) => Number(i) - Number(j)) || null
    props.onChange(sortedValue)
  }, [props])
  /**
   *
   */
  const handleInputOnSubmit = useCallback((type: 'start' | 'end') => {
    if (innerValue.startValue && innerValue.endValue) {
      const originalInput = formatTimeValue(type === 'start' ? innerValue.startValue : innerValue.endValue)
      const input = type === 'start' ? innerValue.startInput : innerValue.endInput
      if (originalInput === input) return;
      try {
        if (input === '') {
          handleValueOnChange(null)
        } else {
          const result = tryParseTimeFromString(input)
          handleValueOnChange(type === 'start' ? [result, getDateFromTimeValue(innerValue.endValue)] : [getDateFromTimeValue(innerValue.startValue), result])
        }
      } catch {
        resetInnerValue()
      }
    }
  }, [handleValueOnChange, innerValue.endInput, innerValue.endValue, innerValue.startInput, innerValue.startValue, resetInnerValue])
  /**
   * handle user select date in TimeSelect.
   */
  const handleTimeSelect = useCallback((type: 'start' | 'end') => {
    return (value: TimeSelectValue) => {
      setInnerValue((oldValue) => {
        return {
          ...oldValue,
          ...(type === 'start' ? {
            startValue: value,
            startInput: formatTimeValue(value),
          } : {}),
          ...(type === 'end' ? {
            endValue: value,
            endInput: formatTimeValue(value),
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
        onClickAway={() => { closePopover(); resetInnerValue(); }}
        activator={
          <Activator
            onClick={() => {
              openPopover()
              setTimeout(() => {
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
                    closePopover()
                  }}
                />
              )}
            </Toolbar>
            <StartSection>
              <TimeSelect
                ref={startTimeSelectRef}
                value={innerValue.startValue}
                onChange={handleTimeSelect('start')}
              />
            </StartSection>
            <EndSection>
              <TimeSelect
                ref={endTimeSelectRef}
                value={innerValue.endValue}
                onChange={handleTimeSelect('end')}
              />
            </EndSection>
          </Main>
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
        </Container>
      </Popover>
    </Root>
  )
})
export type TimeRangePickerProps = UUIFunctionComponentProps<typeof TimeRangePicker>

function getInnerValue(value: TimeRangePickerValue | null): TimeRangePickerPendingValue {
  if (value === null) {
    return {
      startValue: null,
      endValue: null,
      startInput: '',
      endInput: '',
    }
  }
  return {
    startValue: getTimeValue(value[0]),
    endValue: getTimeValue(value[1]),
    startInput: formatTimeFromDate(value[0]),
    endInput: formatTimeFromDate(value[1]),
  }
}
