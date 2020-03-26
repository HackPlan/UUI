import React from 'react';

import './Tag.scss'
import classNames from 'classnames';
import { UUI } from '../../utils/uui';

export interface TagProps {
  children?: React.ReactNode | string
  onClick?: () => void
}

export const Tag = UUI.FunctionComponent({
  name: 'Tag',
  nodes: {
    Root: 'div',
    Content: 'span',
  },
}, (props: TagProps, nodes) => {
  const { Root, Content } = nodes
  return (
    <Root
      className={classNames([
        'u-inline-flex u-justify-center u-items-center u-content-center u-bg-gray-600',
        'u-m-1 u-px-2 u-rounded',
        props.onClick ? 'u-cursor-pointer interactive u-select-none' : '',
      ])}
      onClick={props.onClick ? (() => {
        props.onClick && props.onClick()
      }) : undefined}
    >
      <Content className={classNames(['u-text-white'])}>{props.children}</Content>
    </Root>
  )
})