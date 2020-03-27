import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';

export enum TextFieldNodeName {
  TextField = "textfield",
  Root = "root",
  Input = "input",
  LeftElement = "leftelement",
  RightElement = "rightelement",
}

type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>
export interface TextFieldProps extends InputHTMLAttributes, StylishProps<TextFieldNodeName> {
  type?: 'text' | 'tel' | 'url' | 'email' | 'password'
  value: string | null | undefined
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextField(props: TextFieldProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(TextFieldNodeName.TextField, props, { prefix: "uui" })
    return [
      stylished.element('input', TextFieldNodeName.Root),
    ]
  }, [])
  return (
    <Root
      {...omit(props, 'leftNode', 'rightNode', 'value', 'onChange')}
      className={"u-w-full u-p-2 u-border u-border-black"}
      value={props.value || ''}
      onChange={(event) => {
        props.onChange(event.target.value, event)
      }}
    />
  )
}