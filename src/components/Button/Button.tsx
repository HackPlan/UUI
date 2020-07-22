import classNames from 'classnames';
import { omit } from 'lodash';
import React from 'react';
import { UUI } from '../../core/uui';
import { LoadingSpinner } from '../Loading';

export interface ButtonStylingProps {
  styling?: {
    type?: 'default' | 'primary' | 'text';
  };
}

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
}, (props: ButtonFeatureProps & ButtonStylingProps, nodes) => {
  const { Root, LoadingSpinner, Content } = nodes

  return (
    <Root
      {...omit(props, 'customize', 'styling', 'className', 'style', 'loading')}
      className={classNames({
        ...(props.styling?.type ? {
          [`TYPE_${props.styling?.type}`]: true,
        } : {}),
        'STATE_disabled': props.disabled || props.loading,
        'STATE_loading': props.loading,
      })}>
      {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = Parameters<typeof Button>[0]
