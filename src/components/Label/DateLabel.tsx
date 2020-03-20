import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { DateFormatterLocale, DateFormatterLocaleKinds, dateFormat } from '../../utils/dateFormatter';

export enum DateLabelNodeName {
  DateLabel = "datelabel",
  Root = "root",
}

export interface DateLabelProps<T extends DateFormatterLocale> extends React.HTMLAttributes<HTMLOrSVGElement>, StylishProps<DateLabelNodeName> {
  value: Date
  locale: T
  kind: DateFormatterLocaleKinds[T][number]
}

export function DateLabel<T extends DateFormatterLocale>(props: DateLabelProps<T>) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(DateLabelNodeName.DateLabel, props, { prefix: "uui" })
    return [
      stylished.element('label', DateLabelNodeName.Root),
    ]
  }, [])

  const text = dateFormat(props.value, props.locale, props.kind)

  return (
    <Root>{text}</Root>
  )
}