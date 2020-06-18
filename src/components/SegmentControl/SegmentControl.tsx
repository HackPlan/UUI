import React from 'react';
import { UUI, UUIComponentProps } from '../../core/uui';
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
  Container: 'div',
  Option: 'div',
  Thumb: 'div',
} as const

const BaseSegmentControl = UUI.FunctionComponent({
  name: 'SegmentControl',
  nodes: SegmentControlNodes
}, (props: BaseSegmentControlProps<any>, nodes) => {
  const { Root, Container, Option, Thumb } = nodes;

  const selectedIndex = props.options.findIndex((i) => i.value === props.value)
  const thumbStyle = {
    marginLeft: `${selectedIndex / props.options.length * 100}%`,
    width: `${1/props.options.length * 100}%`,
  }

  return (
    <Root>
      <Container>
        <Thumb style={thumbStyle} />
        {props.options.map((option) => {
          return (
            <Option
              key={option.value}
              className={classNames({
                'Active': props.value === option.value
              })}
              onClick={() => {
                if (props.value !== option.value) {
                  props.onChange(option.value)
                }
              }}
            >{option.label}</Option>
          )
        })}
      </Container>
    </Root>
  )
})

export function SegmentControl<T extends string | number>(props: UUIComponentProps<BaseSegmentControlProps<T>, typeof SegmentControlNodes>) {
  return <BaseSegmentControl {...props} />
}
SegmentControl.displayName = `<UUI> [GenericComponent] SegmentControl`
export type SegmentControlProps = Parameters<typeof SegmentControl>[0]
