import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { TimeFormatterLocale, TimeFormatterLocaleKinds, timeFormat } from '../../utils/timeFormatter';

export enum TimeLabelNodeName {
  TimeLabel = "timelabel",
  Root = "root",
}

export interface TimeLabelProps<T extends TimeFormatterLocale> extends React.HTMLAttributes<HTMLOrSVGElement>, StylishProps<TimeLabelNodeName> {
  value: Date
  locale: T
  kind: TimeFormatterLocaleKinds[T][number]
}

export function TimeLabel<T extends TimeFormatterLocale>(props: TimeLabelProps<T>) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(TimeLabelNodeName.TimeLabel, props, { prefix: "uui" })
    return [
      stylished.element('label', TimeLabelNodeName.Root),
    ]
  }, [])

  const text = timeFormat(props.value, props.locale, props.kind)

  return (
    <Root>{text}</Root>
  )
}