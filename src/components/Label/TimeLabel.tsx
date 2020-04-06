import React from 'react';
import { TimeFormatterLocale, TimeFormatterLocaleKinds, timeFormat } from '../../utils/timeFormatter';
import { UUI } from '../../utils/uui';

export interface BaseTimeLabelProps<T extends TimeFormatterLocale> {
  value: Date
  locale: T
  kind: TimeFormatterLocaleKinds[T][number]
}

export const TimeLabel = UUI.FunctionComponent({
  name: 'TimeLabel',
  nodes: {
    Root: 'div',
  }
}, (props: BaseTimeLabelProps<TimeFormatterLocale>, nodes) => {
  const { Root } = nodes

  const text = timeFormat(props.value, props.locale, props.kind)
  return (
    <Root>{text}</Root>
  )
})

export type TimeLabelProps = Parameters<typeof TimeLabel>[0]