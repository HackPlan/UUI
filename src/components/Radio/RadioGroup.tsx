import React from 'react';
import { RadioFeatureProps } from './Radio';
import { UUI, UUIComponentProps } from '../../core/uui';

export interface RadioGroupFeatureProps<T extends string | number> {
  /**
   * The name of a group of radios
   * @default none
   */
  name?: string;
  /**
   * The value of selected radio.
   *
   * T should be string or number.
   */
  value: T;
  /**
   * Callback invokes when user change to select radio.
   */
  onChange: (value: T) => void;
  /**
   * Array of `Radio`
   */
  children: React.ReactElement<RadioFeatureProps<T>>[] | React.ReactElement<RadioFeatureProps<T>>;
}

const RadioGroupNodes = {
  Root: 'div'
} as const

const BaseRadioGroup = UUI.FunctionComponent({
  name: "RadioGroup",
  nodes: RadioGroupNodes,
}, (props: RadioGroupFeatureProps<any>, nodes) => {
  const { Root } = nodes
  return (
    <Root role="radiogroup">
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement<RadioFeatureProps<any>>(child, {
          ...child.props,
          ...(props.name ? { name: props.name } : {}),
          checked: child.props.value === props.value,
          onChange: () => {
            props.onChange(child.props.value)
          },
        })
      })}
    </Root>
  )
})

export function RadioGroup<T extends string | number>(props: UUIComponentProps<RadioGroupFeatureProps<T>, typeof RadioGroupNodes>) {
  return <BaseRadioGroup {...props} />
}
RadioGroup.displayName = `<UUI> [GenericComponent] RadioGroup`
export type RadioGroupProps = Parameters<typeof RadioGroup>[0]
