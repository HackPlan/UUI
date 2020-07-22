import React from 'react';
import { TimeFormatterLocale, TimeFormatterLocaleKinds, timeFormat } from '../../utils/timeFormatter';
import { UUI } from '../../core/uui';

export interface TimeLabelFeatureProps<T extends TimeFormatterLocale> {
  /**
   * Date value to be displayed.
   *
   * Only the part of time (hour, minute, second) is valid for this Component
   */
  value: Date;
  /**
   * The locale of display format.
   */
  locale: T;
  /**
   * The display format of date.
   *
   * DateLabel provides a group of presets of time format,
   * These presets refer to the formats in Excel.
   */
  kind: TimeFormatterLocaleKinds[T][number];
}

export const TimeLabel = UUI.FunctionComponent({
  name: 'TimeLabel',
  nodes: {
    Root: 'div',
  }
}, (props: TimeLabelFeatureProps<TimeFormatterLocale>, nodes) => {
  const { Root } = nodes

  const text = timeFormat(props.value, props.locale, props.kind)
  return (
    <Root>{text}</Root>
  )
})

export type TimeLabelProps = Parameters<typeof TimeLabel>[0]