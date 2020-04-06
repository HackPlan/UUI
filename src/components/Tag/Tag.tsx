import React from 'react';

import './Tag.scss'
import classNames from 'classnames';
import { UUI } from '../../utils/uui';

export interface BaseTagProps {
  children?: React.ReactNode | string
  onClick?: () => void
}

export const TagNodes = {
  Root: 'div',
  Content: 'span',
} as const

export const Tag = UUI.FunctionComponent({
  name: 'Tag',
  nodes: TagNodes,
}, (props: BaseTagProps, nodes) => {
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

export type TagProps = Parameters<typeof Tag>[0]