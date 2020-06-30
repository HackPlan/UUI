import React, { useState, useCallback } from 'react';
import { UUI } from '../../core/uui';
import { useInterval } from 'react-use';
import { DateTime, Duration } from 'luxon';

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
  /**
   * Whether the time could be a negative value.
   * @default false
   */
  allowNegative?: boolean;
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
    allowNegative: props.allowNegative || false,
  }

  const generateLabelText = useCallback(() => {
    const diff = DateTime.fromJSDate(props.until).diffNow()
    const duration = (!props.allowNegative && diff.milliseconds < 0) ? Duration.fromMillis(0) : diff
    return duration.toFormat(finalProps.format)
  }, [finalProps.format, props.allowNegative, props.until])

  const [text, setText] = useState(generateLabelText())
  useInterval(() => {
    setText(generateLabelText())
  }, finalProps.frequency)

  return (
    <Root>{text}</Root>
  )
})



export type CountdownLabelProps = Parameters<typeof CountdownLabel>[0]
