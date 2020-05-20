import React from 'react';
import { UUI, UUIComponentProps } from '../../utils/uui';
import { Button as UUIButton } from '../Button';
import classNames from 'classnames';

export interface SegmentControlOption<T extends string | number> {
  label: React.ReactNode;
  value: T;
}

export interface BaseSegmentControlProps<T extends string | number> {
  /**
   * The options for the radios of the Segmented Control.
   */
  options: SegmentControlOption<T>[];
  /**
   * The value of radio.
   *
   * T should be string or number.
   */
  value: T;
  /**
   * Callback invokes when user change SegmentControl selected value.
   */
  onChange: (value: T) => void;
}

const SegmentControlNodes = {
  Root: 'div',
  Button: UUIButton,
} as const

const BaseSegmentControl = UUI.FunctionComponent({
  name: 'SegmentControl',
  nodes: SegmentControlNodes
}, (props: BaseSegmentControlProps<any>, nodes) => {
  const { Root, Button } = nodes;

  return (
    <Root>
      {props.options.map((option) => {
        return (
          <Button
            key={option.value}
            className={classNames({
              'Active': props.value === option.value
            })}
            onClick={() => {
              if (props.value !== option.value) {
                props.onChange(option.value)
              }
            }}
          >{option.label}</Button>
        )
      })}
    </Root>
  )
})

export function SegmentControl<T extends string | number>(props: UUIComponentProps<BaseSegmentControlProps<T>, typeof SegmentControlNodes>) {
  return <BaseSegmentControl {...props} />
}
export type SegmentControlProps = Parameters<typeof SegmentControl>[0]
