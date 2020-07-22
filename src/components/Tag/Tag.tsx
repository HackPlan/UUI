import React from 'react';
import classNames from 'classnames';
import { UUI } from '../../core/uui';

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

export const Tag = UUI.FunctionComponent({
  name: 'Tag',
  nodes: TagNodes,
}, (props: TagFeatureProps, nodes) => {
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

export type TagProps = Parameters<typeof Tag>[0]