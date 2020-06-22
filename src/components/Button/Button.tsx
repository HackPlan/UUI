import React from 'react';
import { UUI } from '../../core/uui';
import { omit } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
}

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingIcon: Icons.Spinner,
    Content: 'div'
  }
}, (props: BaseButtonProps, nodes) => {
  const { Root, LoadingIcon, Content } = nodes
  const { disabled, loading } = props

  return (
    <Root
      {...omit(props, 'customize', 'className', 'style')}
      className={classNames({
        'disabled': disabled || loading,
        'loading': loading,
      })}>
      {loading ? <LoadingIcon width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = Parameters<typeof Button>[0]
