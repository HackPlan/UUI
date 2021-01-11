import React, { useRef } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Button as UUIButton } from '../Button/Button';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { KeyCode } from '../../utils/keyboardHelper';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

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

export const SwitchPropTypes = createComponentPropTypes<SwitchFeatureProps>({
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
})

export const Switch = UUIFunctionComponent({
  name: 'Switch',
  nodes: {
    Root: 'div',
    Button: UUIButton,
    Thumb: 'div',
    LoadingSpinner: LoadingSpinner,
  },
  propTypes: SwitchPropTypes,
}, (props: SwitchFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Button, Thumb, LoadingSpinner } = nodes

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <Root
      ref={ref}
      role="switch"
      aria-checked={props.value}
      {...NodeDataProps({
        'checked': !!props.value,
        'disabled': !!props.disabled,
        'loading': !!props.loading,
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
