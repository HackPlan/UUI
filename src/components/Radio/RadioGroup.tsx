import React from 'react';
import { RadioProps } from './Radio';
import { UUI } from '../../utils/uui';

export interface RadioGroupOptions {
  label: string
  value: string
}
export interface RadioGroupProps<T extends string | number> {
  name?: string
  value: T
  onChange: (value: T) => void
  children: React.ReactElement<RadioProps<T>>[] | React.ReactElement<RadioProps<T>>
}

// TODO: enhance UUI function component props generic
export const RadioGroup = <K extends string | number>(props: RadioGroupProps<K>) => {
  return UUI.FunctionComponent({
    name: "RadioGroup",
    nodes: {
      Root: 'div'
    }
  }, (props: RadioGroupProps<K>, nodes) => {
    const { Root } = nodes

    return (
      <Root
        className={"u-flex u-flex-row u-items-center u-block"}
      >
        {React.Children.map(props.children, (child: any) => {
          return React.cloneElement<RadioProps<string | number>>(child, {
            ...child.props,
            ...(props.name ? { name: props.name } : {}),
            checked: child.props.value === props.value,
            onChange: (event) => {
              props.onChange(child.props.value)
            },
          })
        })}
      </Root>
    )
  })(props)
}
