import React from 'react';
import { DateFormatterLocale, DateFormatterLocaleKinds, dateFormat } from '../../utils/dateFormatter';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface DateLabelFeatureProps<T extends DateFormatterLocale> {
  /**
   * Date value to be displayed.
   *
   * Only the part of date (year, month, day, week) is valid for this Component
   */
  value: Date;
  /**
   * The locale of display format.
   */
  locale: T;
  /**
   * The display format of date.
   *
   * DateLabel provides a group of presets of date format,
   * These presets refer to the formats in Excel.
   */
  kind: DateFormatterLocaleKinds[T][number];
}

export const DateLabel = UUIFunctionComponent({
  name: 'DateLabel',
  nodes: {
    Root: 'label',
  }
}, (props: DateLabelFeatureProps<DateFormatterLocale>, nodes) => {
  const { Root } = nodes

  const text = dateFormat(props.value, props.locale, props.kind)
  return (
    <Root>{text}</Root>
  )
})

export type DateLabelProps = UUIFunctionComponentProps<typeof DateLabel>