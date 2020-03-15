import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

export enum BaseButtonNodeName {
  BaseButton = "button",
  Root = "root",
}

export interface BaseButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, StylishProps<BaseButtonNodeName> {
}

export function BaseButton(props: BaseButtonProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(BaseButtonNodeName.BaseButton, props, { prefix: "uui" })
    return [
      stylished.element('button', BaseButtonNodeName.Root),
    ]
  }, [])

  return (
    <Root {...props} className={"u-border u-border-black u-py-1 u-px-2"}>
      {props.children}
    </Root>
  )
}