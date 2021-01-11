import React from 'react';
import { isString } from 'lodash-es';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { UUIFunctionComponent, UUIComponentProps, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface HTMLSelectOption<T> {
  label: string;
  value: T;
}

export interface HTMLSelectFeatureProps<T extends string | number> {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The options of select
   */
  options: HTMLSelectOption<T>[];
  /**
   * The value of selected option.
   *
   * T should be string or string.
   */
  value?: T;
  /**
   * Callback invokes when user change to select option.
   */
  onChange?: (value: T) => void;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the control is loading.
   * @default false
   */
  disabled?: boolean;

  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
}

export const HTMLSelectOptionPropTypes = createComponentPropTypes<HTMLSelectOption<string | number>>({
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
})
export const HTMLSelectPropTypes = createComponentPropTypes<HTMLSelectFeatureProps<string | number>>({
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(HTMLSelectOptionPropTypes)).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
})

const HTMLSelectNodes = {
  Root: 'div',
  Select: 'select',
  Option: 'option',
  LoadingSpinner: LoadingSpinner,
} as const

const BaseHTMLSelect = UUIFunctionComponent({
  name: "HTMLSelect",
  nodes: HTMLSelectNodes,
  propTypes: HTMLSelectPropTypes,
}, (props: HTMLSelectFeatureProps<any>, { nodes, NodeDataProps }) => {
  const { Root, Select, Option, LoadingSpinner } = nodes
  return (
    <Root
      role="select"
      {...NodeDataProps({
        'disabled': !!props.disabled,
        'loading': !!props.loading,
      })}
    >
      <Select
        disabled={props.disabled}
        name={props.name}
        value={props.value === undefined ? undefined : props.value}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            if (isString(props.value)) {
              props.onChange && props.onChange(event.target.value)
            } else {
              props.onChange && props.onChange(Number(event.target.value))
            }
          }
        )}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        {props.options.map((i) => {
          const selected = i.value === props.value
          return (
            <Option role="option" aria-selected={selected} key={i.value} value={i.value}>{i.label}</Option>
          )
        })}
      </Select>
      {props.loading && (
        <LoadingSpinner width={16} height={16} />
      )}
    </Root>
  )
})

export function HTMLSelect<T extends string | number>(props: UUIComponentProps<HTMLSelectFeatureProps<T>, typeof HTMLSelectNodes>) {
  return <BaseHTMLSelect {...props} />
}
HTMLSelect.displayName = `<UUI> [GenericComponent] HTMLSelect`

export type HTMLSelectProps = UUIFunctionComponentProps<typeof HTMLSelect>

