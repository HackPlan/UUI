import React from 'react';
import { UUI } from '../../utils/uui';


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
  }
}, (props: ButtonProps, nodes) => {
  const { Root } = nodes

  return (
    <Root {...props} className={"u-border u-border-black u-py-1 u-px-2"}>
      {props.children}
    </Root>
  )
})