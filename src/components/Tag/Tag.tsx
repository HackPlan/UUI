import React from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

import './Tag.scss'
import classNames from 'classnames';

export enum TagNodeName {
  Tag = "tag",
  Root = "root",
  Content = "content",
}

export interface TagProps extends StylishProps<TagNodeName> {
  children?: React.ReactNode | string
  onClick?: () => void
}

export function Tag(props: TagProps) {
  const stylished = initStylished<TagNodeName>(TagNodeName.Tag, props, { prefix: "uui" })
  const Root = stylished.element('div', TagNodeName.Root)
  const Content = stylished.element('span', TagNodeName.Content)
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
}