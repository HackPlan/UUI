import React from 'react';
import { BaseRadioProps } from './Radio';
import { UUI, UUIComponentProps } from '../../core/uui';

export interface BaseRadioGroupProps<T extends string | number> {
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
  children: React.ReactElement<BaseRadioProps<T>>[] | React.ReactElement<BaseRadioProps<T>>;
}

const RadioGroupNodes = {
  Root: 'div'
} as const

const BaseRadioGroup = UUI.FunctionComponent({
  name: "RadioGroup",
  nodes: RadioGroupNodes,
}, (props: BaseRadioGroupProps<any>, nodes) => {
  const { Root } = nodes
  return (
    <Root>
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement<BaseRadioProps<any>>(child, {
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

export function RadioGroup<T extends string | number>(props: UUIComponentProps<BaseRadioGroupProps<T>, typeof RadioGroupNodes>) {
  return <BaseRadioGroup {...props} />
}
RadioGroup.displayName = `<UUI> [GenericComponent] RadioGroup`
export type RadioGroupProps = Parameters<typeof RadioGroup>[0]
