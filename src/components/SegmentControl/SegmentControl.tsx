import React from 'react';
import { UUI } from '../../utils/uui';
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

export interface BaseSegmentControlState {}

export class SegmentControl<T extends string | number> extends UUI.ClassComponent({
  name: 'SegmentControl',
  nodes: {
    Root: 'div',
    Button: UUIButton,
  }
})<BaseSegmentControlProps<T>, BaseSegmentControlState> {

  render() {
    const { Root, Button } = this.nodes;

    return (
      <Root>
        {this.props.options.map((option) => {
          return (
            <Button
              key={option.value}
              className={classNames({
                'Active': this.props.value === option.value
              })}
              onClick={() => {
                if (this.props.value !== option.value) {
                  this.props.onChange(option.value)
                }
              }}
            >{option.label}</Button>
          )
        })}
      </Root>
    )
  }
}
