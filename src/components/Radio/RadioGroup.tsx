import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import classNames from 'classnames';

export enum RadioGroupNodeName {
  RadioGroup = "radiogroup",
  Root = "root",
  Radio = "radio"
}

export interface RadioGroupOptions {
  label: string
  value: string
}
export interface RadioGroupProps extends StylishProps<RadioGroupNodeName> {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}

export function RadioGroup(props: RadioGroupProps) {

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
        return (
          <child.type
            {...child.props}
            checked={child.props.value === props.value}
            onChange={(event: any) => {
              props.onChange(event.target.value)
            }}
          />
        )
      })}
    </Root>
  )
}

