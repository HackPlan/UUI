import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import classNames from 'classnames';

export enum BaseRadioGroupNodeName {
  BaseRadioGroup = "base-radio-group",
  Root = "root",
  Radio = "radio"
}

export interface BaseRadioGroupOptions {
  label: string
  value: string
}
export interface BaseRadioGroupProps extends StylishProps<BaseRadioGroupNodeName> {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}

export function BaseRadioGroup(props: BaseRadioGroupProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(BaseRadioGroupNodeName.BaseRadioGroup, props, { prefix: "uui" })
    return [
      stylished.element('div', BaseRadioGroupNodeName.Root),
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

