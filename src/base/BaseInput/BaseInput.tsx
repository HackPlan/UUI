import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { omit } from 'lodash';

export enum BaseInputNodeName {
  BaseInput = "input",
  Root = "root",
}

type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
export interface BaseInputProps extends InputHTMLAttributes, StylishProps<BaseInputNodeName> {
  value: string
  onChange: (value: string) => void
}

export function BaseInput(props: BaseInputProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(BaseInputNodeName.BaseInput, props, { prefix: "uui" })
    return [
      stylished.element('input', BaseInputNodeName.Root),
    ]
  }, [])

  return (
    <Root
      {...omit(props, 'value', 'onChange')}
      value={props.value}
      onChange={(event) => {
        props.onChange(event.target.value)
      }}
      className={"u-border u-border-black u-py-1 u-px-2"}
    />
  )
}