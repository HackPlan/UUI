import React from 'react';
import classNames from 'classnames';
import { KeyCode } from '../../utils/keyboardHelper';
import { UUIFunctionComponent, UUIComponentProps, UUIFunctionComponentProps } from '../../core';

export interface SegmentControlOption<T extends string | number> {
  label: React.ReactNode;
  value: T;
}

export interface SegmentControlFeatureProps<T extends string | number> {
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

  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

const SegmentControlNodes = {
  Root: 'div',
  Container: 'div',
  Option: 'div',
  Thumb: 'div',
} as const

const BaseSegmentControl = UUIFunctionComponent({
  name: 'SegmentControl',
  nodes: SegmentControlNodes
}, (props: SegmentControlFeatureProps<any>, { nodes }) => {
  const { Root, Container, Option, Thumb } = nodes;

  const selectedIndex = props.options.findIndex((i) => i.value === props.value)
  const thumbStyle = {
    marginLeft: `${selectedIndex / props.options.length * 100}%`,
    width: `${1/props.options.length * 100}%`,
  }

  return (
    <Root
      role="tabs"
      tabIndex={0}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.ArrowLeft: {
            const focusTabIndex = props.options.findIndex((i) => i.value === props.value)
            const index = (focusTabIndex + props.options.length - 1) % props.options.length
            props.onChange(props.options[index].value)
            break
          }
          case KeyCode.ArrowRight: {
            const focusTabIndex = props.options.findIndex((i) => i.value === props.value)
            const index = (focusTabIndex + props.options.length + 1) % props.options.length
            props.onChange(props.options[index].value)
            break
          }
          case KeyCode.Home: {
            if (props.options.length > 0 && props.options[0]) {
              props.onChange(props.options[0].value)
            }
            break
          }
          case KeyCode.End: {
            if (props.options.length > 0 && props.options[props.options.length-1]) {
              props.onChange(props.options[props.options.length-1].value)
            }
            break
          }
          default:
            // do nothing
        }
      }}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <Container role="tablist">
        <Thumb style={thumbStyle} />
        {props.options.map((option) => {
          const active = props.value === option.value
          return (
            <Option
              role="tab"
              aria-selected={active}
              key={option.value}
              className={classNames({
                'STATE_active': active
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

export function SegmentControl<T extends string | number>(props: UUIComponentProps<SegmentControlFeatureProps<T>, typeof SegmentControlNodes>) {
  return <BaseSegmentControl {...props} />
}
SegmentControl.displayName = `<UUI> [GenericComponent] SegmentControl`
export type SegmentControlProps = UUIFunctionComponentProps<typeof SegmentControl>
