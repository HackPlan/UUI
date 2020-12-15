import React, { useState, useEffect } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Button } from '../Button';
import { Icons } from '../../icons/Icons';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import classNames from 'classnames';

export interface TextFieldFeatureProps {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The type of user input.
   * TextField only support string kind type
   * @default text
   */
  type?: 'text' | 'tel' | 'url' | 'email' | 'password';
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * The value to display in the input field.
   */
  value?: string | null | undefined;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The maximum length of the input.
   * @default none
   */
  maxLength?: number;
  /**
   * Show input length indicator
   * @default false
   */
  showLengthIndicator?: boolean;
  /**
   * Show button of toggling display/hide password
   * @default false
   */
  showPasswordVisibleButton?: boolean;
  /**
   * Whether the text of password is visible.
   *
   * if this prop is provided, inner password visible state will changed by this value
   *
   * @default false
   */
  passwordVisible?: boolean;
  /**
   * Callback invoked when user click password visible button
   * @default false
   */
  onPasswordVisibleChange?: (value: boolean) => void;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const TextField = UUIFunctionComponent({
  name: 'TextField',
  nodes: {
    Root: 'div',
    Input: 'input',
    LengthIndicator: 'div',
    TogglePasswordVisibleButton: Button,
    ShowPasswordIcon: Icons.Eye,
    HidePasswordIcon: Icons.EyeOff,
    LoadingSpinner: LoadingSpinner,
  }
}, (props: TextFieldFeatureProps, nodes) => {
  const {
    Root, Input,
    LengthIndicator, TogglePasswordVisibleButton,
    ShowPasswordIcon, HidePasswordIcon,
    LoadingSpinner,
  } = nodes

  /**
   * password visible inner state in the component.
   * if props.passwordVisible is provided, this inner state will changed by outer prop state.
   */
  const [passwordVisible, setPasswordVisible] = useState<boolean>(props.passwordVisible || false)
  useEffect(() => {
    setPasswordVisible(props.passwordVisible || false)
  }, [props.passwordVisible])
  const finalType = ((): TextFieldFeatureProps['type'] => {
    if (props.type === 'password' && passwordVisible) {
      return 'text'
    } else {
      return props.type || 'text'
    }
  })()

  const lengthIndicatorText = (`${props.value?.length || 0}`) + (props.maxLength ? `/${props.maxLength}` : '')

  return (
    <Root
      role="input"
      aria-readonly={!!props.disabled}
      aria-placeholder={props.placeholder}
      className={classNames({
        'STATE_disabled': props.disabled,
        'STATE_loading': props.loading,
      })}
    >
      <Input
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        maxLength={props.maxLength}
        type={finalType}
        value={props.value === undefined ? undefined : (props.value || '')}
        onChange={props.onChange === undefined ? undefined : (
          (event) => {
            props.onChange && props.onChange(event.target.value, event)
          }
        )}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      ></Input>
      {props.loading && (
        <LoadingSpinner width={16} height={16} />
      )}
      {props.maxLength && props.showLengthIndicator && (
        <LengthIndicator>
          {lengthIndicatorText}
        </LengthIndicator>
      )}
      {props.showPasswordVisibleButton && (
        <TogglePasswordVisibleButton
          onClick={() => {
            if (props.passwordVisible) {
              props.onPasswordVisibleChange && props.onPasswordVisibleChange(!passwordVisible)
            } else {
              setPasswordVisible((value) => !value)
            }
          }}
        >
          {passwordVisible
            ? <ShowPasswordIcon />
            : <HidePasswordIcon />
          }
        </TogglePasswordVisibleButton>
      )}
    </Root>
  )
})

export type TextFieldProps = UUIFunctionComponentProps<typeof TextField>
