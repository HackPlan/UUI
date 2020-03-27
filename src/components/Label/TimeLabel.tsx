import React from 'react';
import { TimeFormatterLocale, TimeFormatterLocaleKinds, timeFormat } from '../../utils/timeFormatter';
import { UUI } from '../../utils/uui';

export interface TimeLabelProps<T extends TimeFormatterLocale> extends React.HTMLAttributes<HTMLOrSVGElement> {
  value: Date
  locale: T
  kind: TimeFormatterLocaleKinds[T][number]
}

export const TimeLabel = UUI.FunctionComponent({
  name: 'TimeLabel',
  nodes: {
    Root: 'div',
  }
}, (props: TimeLabelProps<TimeFormatterLocale>, nodes) => {
  const { Root } = nodes

  const text = timeFormat(props.value, props.locale, props.kind)
  return (
    <Root>{text}</Root>
  )
})