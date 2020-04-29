import React from 'react';
import { UUI } from '../../utils/uui';
import { omit } from 'lodash';
import classNames from 'classnames';


export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
  }
}, (props: BaseButtonProps, nodes) => {
  const { Root } = nodes

  return (
    <Root
      {...omit(props, 'customize', 'className', 'style')}
      className={classNames({
        'disabled': props.disabled,
      })}>
      {props.children}
    </Root>
  )
})

export type ButtonProps = Parameters<typeof Button>[0]
