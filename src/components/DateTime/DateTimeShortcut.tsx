import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps, UUIComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';
import { isArray } from 'lodash-es';

export interface DateTimeShortcutOption<T extends Date | [Date, Date]> {
  label: string;
  value: T | (() => T);
}
export interface DateTimeShortcutFeatureProps<T extends Date | [Date, Date]> {
  options: DateTimeShortcutOption<T>[];
  onSelect: (value: T) => void;
}

export const DateTimeShortcutOptionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date).isRequired,
    PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    PropTypes.func.isRequired,
  ])
})
export const DateTimeShortcutPropTypes = createComponentPropTypes<DateTimeShortcutFeatureProps<any>>({
  options: PropTypes.arrayOf(DateTimeShortcutOptionPropTypes),
  onSelect: PropTypes.func.isRequired,
})

export const DateTimeShortcutNodes = {
  Root: 'div',
  Option: 'div',
} as const
export const BaseDateTimeShortcut = UUIFunctionComponent({
  name: 'DateTimeShortcut',
  nodes: DateTimeShortcutNodes,
  propTypes: DateTimeShortcutPropTypes,
}, (props: DateTimeShortcutFeatureProps<Date | [Date, Date]>, { nodes }) => {
  const { Root, Option } = nodes

  return (
    <Root>
      {props.options.map((option) => {
        const value = getShortcutValue(option)
        const key = (() => {
          if (isSingleValue(value)) {
            return value.toISOString()
          } else if (isRangeValue(value)) {
            return `${value[0].toISOString()} ${value[1].toISOString()}`
          } else {
            return String(value)
          }
        })()
        return (
          <Option
            key={key}
            onClick={() => {
              props.onSelect(value)
            }}
          >{option.label}</Option>
        )
      })}
    </Root>
  )
})

export function DateTimeShortcut<T extends Date | [Date, Date]>(props: UUIComponentProps<DateTimeShortcutFeatureProps<T>, typeof DateTimeShortcutNodes>) {
  const _BaseDateTimeShortcut = BaseDateTimeShortcut as any
  return <_BaseDateTimeShortcut {...props} />
}
DateTimeShortcut.displayName = `<UUI> [GenericComponent] DateTimeShortcut`
export type DateTimeShortcutProps = UUIFunctionComponentProps<typeof DateTimeShortcut>

const isRangeValue = (value: any): value is [Date, Date] => {
  return isArray(value)
}
const isSingleValue = (value: any): value is Date => {
  return !isArray(value)
}

function getShortcutValue<T extends Date | [Date, Date]>(option: DateTimeShortcutOption<T>) {
  if (typeof option.value === 'function') {
    return option.value()
  } else {
    return option.value
  }
}