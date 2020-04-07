import React from 'react';
import { BaseRadioProps } from './Radio';
import { UUI, UUIComponentCustomizeProps, UUIConvenienceProps } from '../../utils/uui';

export interface RadioGroupOptions {
  label: string
  value: string
}
export interface BaseRadioGroupProps<T extends string | number> {
  /**
   * The name of a group of radios
   * @default none
   */
  name?: string
  /**
   * The value of selected radio.
   *
   * T should be string or number.
   */
  value: T
  /**
   * Callback invokes when user change to select radio.
   */
  onChange: (value: T) => void
  /**
   * Array of `Radio`
   */
  children: React.ReactElement<BaseRadioProps<T>>[] | React.ReactElement<BaseRadioProps<T>>
}

const RadioGroupNodes = {
  Root: 'div'
} as const
type RadioGroupCustomizeProps = UUIComponentCustomizeProps<typeof RadioGroupNodes>

// TODO: enhance UUI function component props generic
export const RadioGroup = <K extends string | number>(props: BaseRadioGroupProps<K> & RadioGroupCustomizeProps & UUIConvenienceProps) => {
  const BaseRadioGroup = UUI.FunctionComponent({
    name: "RadioGroup",
    nodes: RadioGroupNodes,
  }, (props: BaseRadioGroupProps<K>, nodes) => {
    const { Root } = nodes

    return (
      <Root
        className={"u-flex u-flex-row u-items-center u-block"}
      >
        {React.Children.map(props.children, (child: any) => {
          return React.cloneElement<BaseRadioProps<K>>(child, {
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
  return <><BaseRadioGroup {...props}></BaseRadioGroup></>
}

export type RadioGroupProps = Parameters<typeof RadioGroup>[0]