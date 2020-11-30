import classNames from 'classnames';
import { omit } from 'lodash-es';
import React, { useRef } from 'react';
import { LoadingSpinner } from '../Loading';
import { KeyCode } from '../../utils/keyboardHelper';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

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

export const Button = UUIFunctionComponent({
  name: 'Button',
  nodes: {
    Root: 'button',
    LoadingSpinner: LoadingSpinner,
    Content: 'div',
  },
}, (props: ButtonFeatureProps & ButtonStylingProps, nodes) => {
  const { Root, LoadingSpinner, Content } = nodes

  const ref = useRef<HTMLElement | null>(null)

  return (
    <Root
      role="button"
      {...omit(props, 'customize', 'styling', 'className', 'style', 'loading', 'prefix', 'separator')}
      className={classNames({
        [`TYPE_${props.styling?.type}`]: !!props.styling?.type,
        'STATE_disabled': props.disabled || props.loading,
        'STATE_loading': props.loading,
      })}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            ref.current?.click()
            break
          default:
            // do nothing
        }
      }}
    >
      {props.loading ? <LoadingSpinner animate width={14} height={14} /> : null}
      {props.children ? <Content>{props.children}</Content> : null}
    </Root>
  )
})

export type ButtonProps = UUIFunctionComponentProps<typeof Button>
