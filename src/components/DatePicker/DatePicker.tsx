import React, { useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { format, isValid } from 'date-fns';

export interface DatePickerFeatureProps {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The value to display in the input field.
   */
  value?: Date | null;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange?: (value: Date, event: React.ChangeEvent<HTMLInputElement>) => void;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const DatePicker = UUIFunctionComponent({
  name: 'DatePicker',
  nodes: {
    Root: 'div',
    Input: 'input',
  }
}, (props: DatePickerFeatureProps, { nodes }) => {
  const { Root, Input } = nodes

  const dateValue = useMemo(() => {
    if (!props.value) return ''
    return format(props.value, 'yyyy-LL-dd')
  }, [props.value])

  return (
    <Root>
      <Input
        role="input"
        type="date"
        name={props.name}
        value={props.value === undefined ? undefined : dateValue}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            const newValue = new Date(event.target.value)
            if (!isValid(newValue)) return
            props.onChange && props.onChange(newValue, event)
          }
        )}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </Root>
  )
})

export type DatePickerProps = UUIFunctionComponentProps<typeof DatePicker>
