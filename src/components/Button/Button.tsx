import React from 'react';
import { UUI } from '../../utils/uui';


export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
  }
}, (props: BaseButtonProps, nodes) => {
  const { Root } = nodes

  return (
    <Root {...props} className={"u-border u-border-black u-py-1 u-px-2"}>
      {props.children}
    </Root>
  )
})

export type UUIConvenienceProps = {
  className?: string
  style?: React.CSSProperties
}

export type ButtonProps = Parameters<typeof Button>[0]
