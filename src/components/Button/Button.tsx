import classNames from 'classnames';
import { omit } from 'lodash';
import React from 'react';
import { UUI } from '../../core/uui';
import { LoadingSpinner } from '../Loading';

export interface ButtonFeatureProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
}

export const Button = UUI.FunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
}, (props: ButtonFeatureProps, nodes) => {
  const { Root, LoadingSpinner, Content } = nodes
  const { disabled, loading } = props

  return (
    <Root
      {...omit(props, 'customize', 'className', 'style', 'loading')}
      className={classNames({
        'disabled': disabled || loading,
        'loading': loading,
      })}>
      {loading ? <LoadingSpinner animate width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = Parameters<typeof Button>[0]
