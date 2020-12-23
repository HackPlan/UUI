import React from 'react';
import classNames from 'classnames';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface TagFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode | string;
  /**
   * Callback invokes when user click this tag.
   */
  onClick?: () => void;
}

export const TagNodes = {
  Root: 'div',
  Content: 'span',
} as const

export const Tag = UUIFunctionComponent({
  name: 'Tag',
  nodes: TagNodes,
}, (props: TagFeatureProps, { nodes }) => {
  const { Root, Content } = nodes
  return (
    <Root
      className={classNames({
        'STATE_interactive': !!props.onClick,
      })}
      onClick={props.onClick ? (() => {
        props.onClick && props.onClick()
      }) : undefined}
    >
      <Content>{props.children}</Content>
    </Root>
  )
})

export type TagProps = UUIFunctionComponentProps<typeof Tag>