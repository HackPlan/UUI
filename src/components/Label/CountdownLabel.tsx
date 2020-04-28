import React, { useState } from 'react';
import { UUI } from '../../utils/uui';
import { useInterval } from 'react-use';
import { DateTime } from 'luxon';

export interface BaseCountdownLabelProps {
  /**
   * Time in countdown.
   */
  until: Date;
  /**
   * Luxon date format.
   * https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
   * @default hh:mm:ss
   */
  format?: string;
  /**
   * Frequency of update text. (milliseconds)
   * @default 1000
   */
  frequency?: number;
}

export const CountdownLabel = UUI.FunctionComponent({
  name: 'CountdownLabel',
  nodes: {
    Root: 'label',
  }
}, (props: BaseCountdownLabelProps, nodes) => {
  const { Root } = nodes

  const finalProps = {
    frequency: props.frequency || 1000,
    format: props.format || 'hh:mm:ss',
  }

  const [text, setText] = useState(DateTime.fromJSDate(props.until).diffNow().toFormat(finalProps.format))
  useInterval(() => {
    setText(DateTime.fromJSDate(props.until).diffNow().toFormat(finalProps.format))
  }, finalProps.frequency)

  return (
    <Root>{text}</Root>
  )
})

export type CountdownLabelProps = Parameters<typeof CountdownLabel>[0]
