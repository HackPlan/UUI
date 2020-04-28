import React from 'react';
import { UUI } from '../../utils/uui';
import { omit } from 'lodash';


export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
  }
}, (props: BaseButtonProps, nodes) => {
  const { Root } = nodes

  return (
    <Root {...omit(props, 'customize', 'className', 'style')} className={"u-border u-border-black u-py-1 u-px-2"}>
      {props.children}
    </Root>
  )
})

export type ButtonProps = Parameters<typeof Button>[0]
