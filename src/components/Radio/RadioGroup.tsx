import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import classNames from 'classnames';
import { RadioProps } from './Radio';

export enum RadioGroupNodeName {
  RadioGroup = "radiogroup",
  Root = "root",
  Radio = "radio"
}

export interface RadioGroupOptions {
  label: string
  value: string
}
export interface RadioGroupProps<T extends string | number> extends StylishProps<RadioGroupNodeName> {
  name?: string
  value: T
  onChange: (value: T) => void
  children: React.ReactElement<RadioProps<T>>[] | React.ReactElement<RadioProps<T>>
}

export function RadioGroup<T extends string | number>(props: RadioGroupProps<T>) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(RadioGroupNodeName.RadioGroup, props, { prefix: "uui" })
    return [
      stylished.element('div', RadioGroupNodeName.Root),
    ]
  }, [])

  return (
    <Root
      className={classNames("u-flex u-flex-row u-items-center u-block")}
    >
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement<RadioProps<T>>(child, {
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
}

