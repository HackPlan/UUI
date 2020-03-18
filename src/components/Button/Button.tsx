import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

export enum ButtonNodeName {
  Button = "button",
  Root = "root",
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, StylishProps<ButtonNodeName> {
}

export function Button(props: ButtonProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(ButtonNodeName.Button, props, { prefix: "uui" })
    return [
      stylished.element('button', ButtonNodeName.Root),
    ]
  }, [])

  return (
    <Root {...props} className={"u-border u-border-black u-py-1 u-px-2"}>
      {props.children}
    </Root>
  )
}