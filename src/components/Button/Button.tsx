import React from 'react';
import { initStylishedProxy } from '../../utils/stylish';
import { BaseButtonProps, BaseButton } from '../../base/BaseButton';
import classNames from 'classnames';

import './Button.scss';
import { omit } from 'lodash';

export interface ButtonProps extends BaseButtonProps {
  intent?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'normal' | 'medium' | 'large'
  light?: boolean
  outlined?: boolean
  inverted?: boolean
  loading?: boolean
}

export function Button(props: ButtonProps) {
  const ButtonProxy = initStylishedProxy(BaseButton, props)
  return (
    <ButtonProxy
      {...omit(props, 'intent', 'size', 'light', 'loading')}
      extendClassName={{
        root: classNames([
          'button',
          props.intent ? `is-${props.intent}` : '',
          props.size ? `is-${props.size}` : '',
          props.loading ? 'is-loading' : '',
          props.light ? `is-${props.light}` : '',
          props.outlined ? `is-${props.outlined}` : '',
          props.inverted ? `is-${props.inverted}` : '',
        ])
      }}
    />
  )
}