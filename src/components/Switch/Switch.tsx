import React, { useRef } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Button as UUIButton } from '../Button/Button';
import classNames from 'classnames';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { KeyCode } from '../../utils/keyboardHelper';

export enum SwitchNodeName {
  Root = "switch",
  Checkbox = "checkbox",
  Inner = "inner",
}

export type SwitchSize = 'small' | 'default';

export interface SwitchFeatureProps {
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
  value: boolean;
  onChange: (flag: boolean) => void;

  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

export const Switch = UUIFunctionComponent({
  name: 'Switch',
  nodes: {
    Root: 'div',
    Button: UUIButton,
    Thumb: 'div',
    LoadingSpinner: LoadingSpinner,
  }
}, (props: SwitchFeatureProps, { nodes }) => {
  const { Root, Button, Thumb, LoadingSpinner } = nodes

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <Root
      ref={ref}
      role="switch"
      aria-checked={props.value}
      className={classNames({
        'STATE_checked': props.value,
        'STATE_disabled': props.disabled,
        'STATE_loading': props.loading,
      })}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            ref.current?.click()
            break
          default:
            // do nothing
        }
      }}
    >
      <Button
        onClick={() => { !props.disabled && props.onChange(!props.value) }}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        <Thumb>
          {props.loading && <LoadingSpinner width={12} height={12} />}
        </Thumb>
      </Button>
    </Root>
  )
})

export type SwitchProps = UUIFunctionComponentProps<typeof Switch>
