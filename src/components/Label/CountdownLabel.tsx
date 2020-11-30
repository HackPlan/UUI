import React, { useState, useCallback } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { useInterval } from 'react-use';
import { format, differenceInMilliseconds } from 'date-fns';
import { addHours, addMilliseconds } from 'date-fns/esm';

export interface CountdownLabelFeatureProps {
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

export const CountdownLabel = UUIFunctionComponent({
  name: 'CountdownLabel',
  nodes: {
    Root: 'label',
  }
}, (props: CountdownLabelFeatureProps, nodes) => {
  const { Root } = nodes

  const finalProps = {
    frequency: props.frequency || 1000,
    format: props.format || 'hh:mm:ss',
    allowNegative: props.allowNegative || false,
  }

  const generateLabelText = useCallback(() => {
    const diff = differenceInMilliseconds(props.until, new Date())
    const duration = (!props.allowNegative && diff && diff < 0)
      ? new Date(0)
      : addMilliseconds(addHours(new Date(0), 16), diff)
    return format(duration, finalProps.format)
  }, [finalProps.format, props.allowNegative, props.until])

  const [text, setText] = useState(generateLabelText())
  useInterval(() => {
    setText(generateLabelText())
  }, finalProps.frequency)

  return (
    <Root>{text}</Root>
  )
})



export type CountdownLabelProps = UUIFunctionComponentProps<typeof CountdownLabel>
