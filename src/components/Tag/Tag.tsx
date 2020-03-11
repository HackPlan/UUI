import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylishHelper';

import './Tag.scss'

export enum TagNodeName {
  Root = "tag",
  Content = "content",
}

export interface TagProps extends ExtraClassNameProps<TagNodeName>, ExtraStyleProps<TagNodeName> {
  children?: React.ReactNode | string
  onClick?: () => void
}

export function Tag(props: TagProps) {
  const getStylishProps = initStylish<TagNodeName>(TagNodeName.Root, props, { prefix: "uui" })
  return (
    <span
      {...getStylishProps('', [
        'u-inline-flex u-justify-center u-items-center u-content-center u-bg-gray-600',
        'u-m-1 u-px-2 u-rounded',
        props.onClick ? 'u-cursor-pointer interactive u-select-none' : '',
      ])}
      onClick={props.onClick ? (() => {
        props.onClick && props.onClick()
      }) : undefined}
    >
      <span
        {...getStylishProps(TagNodeName.Content, ['u-text-white'])}
      >{props.children}</span>
    </span>
  )
}