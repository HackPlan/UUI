import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';

export enum BaseTextFieldNodeName {
  BaseTextField = "base-text-field",
  Root = "root",
  Input = "input",
  LeftElement = "left-element",
  RightElement = "right-element",
}

type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>
export interface BaseTextFieldProps extends InputHTMLAttributes, StylishProps<BaseTextFieldNodeName> {
  type?: 'text' | 'tel' | 'url' | 'email' | 'password'
  value: string
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function BaseTextField(props: BaseTextFieldProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(BaseTextFieldNodeName.BaseTextField, props, { prefix: "uui" })
    return [
      stylished.element('input', BaseTextFieldNodeName.Root),
    ]
  }, [])
  return (
    <Root
      {...omit(props, 'leftNode', 'rightNode', 'value', 'onChange')}
      className={"u-w-full u-p-2 u-border u-border-black"}
      value={props.value}
      onChange={(event) => {
        props.onChange(event.target.value, event)
      }}
    />
  )
}