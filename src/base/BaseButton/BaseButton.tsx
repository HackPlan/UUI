import React from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

export enum BaseButtonNodeName {
  BaseButton = "button",
  Root = "root",
}

export interface BaseButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, StylishProps<BaseButtonNodeName> {
}

export function BaseButton(props: BaseButtonProps) {
  const stylished = initStylished<BaseButtonNodeName>(BaseButtonNodeName.BaseButton, props, { prefix: "uui" })
  const Root = stylished.element('button', BaseButtonNodeName.Root)
  return (
    <Root {...props} className={"u-border u-border-black u-py-1 u-px-2"}>
      {props.children}
    </Root>
  )
}