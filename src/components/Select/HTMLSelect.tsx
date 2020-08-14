import React from 'react';
import { UUI, UUIComponentProps } from '../../core/uui';
import { isString } from 'lodash';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import classNames from 'classnames';

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
}

const HTMLSelectNodes = {
  Root: 'div',
  Select: 'select',
  Option: 'option',
  LoadingSpinner: LoadingSpinner,
} as const

const BaseHTMLSelect = UUI.FunctionComponent({
  name: "HTMLSelect",
  nodes: HTMLSelectNodes,
}, (props: HTMLSelectFeatureProps<any>, nodes) => {
  const { Root, Select, Option, LoadingSpinner } = nodes
  return (
    <Root
      role="select"
      className={classNames({
        'STATE_disabled': props.disabled,
        'STATE_loading': props.loading,
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

