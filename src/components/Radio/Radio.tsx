import React, { useContext, useMemo } from 'react';
import { omit } from 'lodash-es';
import { RadioGroupContext } from './RadioGroupContext';
import { UUIFunctionComponent, UUIComponentProps, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

type InputHTMLAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'disabled' | 'onChange'
>
export interface RadioFeatureProps<T extends string | number> extends InputHTMLAttributes {
  /**
   * Form control name
   */
  name?: string;
  /**
   * The value of radio.
   *
   * T should be string or number.
   */
  value: T;
  /**
   * The label of radio.
   * @default none
   */
  label?: React.ReactNode;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const RadioPropTypes = createComponentPropTypes<
  Pick<RadioFeatureProps<string | number>, 'name' | 'value' | 'label' | 'onFocus' | 'onBlur'>
>({
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.node,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
})

const RadioNodes = {
  Root: 'label',
  Input: 'input',
  Indicator: 'span',
  Label: 'span',
} as const

const BaseRadio = UUIFunctionComponent({
  name: "Radio",
  nodes: RadioNodes,
  propTypes: RadioPropTypes,
}, (props: RadioFeatureProps<string | number>, { nodes, NodeDataProps }) => {
  const { Root, Input, Indicator, Label } = nodes

  const context = useContext(RadioGroupContext)

  const checked = useMemo(() => {
    if (context) {
      return props.value === context.value
    } else {
      return props.checked
    }
  }, [context, props.checked, props.value])

  const focused = useMemo(() => {
    if (context) {
      return context.focusValue === props.value
    }
  }, [context, props.value])

  return (
    <Root
      role="radio"
      aria-checked={checked}
      {...NodeDataProps({
        'disabled': !!props.disabled,
        'checked': !!checked,
      })}
    >
      <Input
        tabIndex={context ? (focused ? 0 : -1) : 0}
        name={props.name}
        type='radio'
        disabled={props.disabled}
        value={props.value}
        checked={checked}
        onChange={() => context?.onChange(props.value)}
        {...(context ? {} : omit(props, 'className', 'style', 'type', 'label', 'customize'))}
        onFocus={context?.onFocus || props.onFocus}
        onBlur={context?.onBlur || props.onBlur}
      />
      <Indicator></Indicator>
      <Label>{props.label}</Label>
    </Root>
  )
})

export function Radio<T extends string | number>(props: UUIComponentProps<RadioFeatureProps<T>, typeof RadioNodes>) {
  return <BaseRadio {...props} />
}
Radio.displayName = `<UUI> [GenericComponent] Radio`
export type RadioProps = UUIFunctionComponentProps<typeof Radio>
