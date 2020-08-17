import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { DateTime } from 'luxon';

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
}

export const DatePicker = UUI.FunctionComponent({
  name: 'DatePicker',
  nodes: {
    Root: 'div',
    Input: 'input',
  }
}, (props: DatePickerFeatureProps, nodes) => {
  const { Root, Input } = nodes

  const dateValue = useMemo(() => {
    if (!props.value) return ''
    return DateTime.fromJSDate(props.value).toFormat('yyyy-LL-dd')
  }, [props.value])

  return (
    <Root>
      <Input
        role="input"
        type="date"
        name={props.name}
        value={props.value === undefined ? undefined : dateValue}
        onChange={props.onChange === undefined ? undefined : (
          (event) => { props.onChange && props.onChange(new Date(event.target.value), event) }
        )}
      ></Input>
    </Root>
  )
})

export type DatePickerProps = Parameters<typeof DatePicker>[0]
