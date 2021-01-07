import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface TagFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode;
  /**
   * Callback invokes when user click this tag.
   */
  onClick?: () => void;
}

export const TagPropTypes = createComponentPropTypes<TagFeatureProps>({
  children: PropTypes.node,
  onClick: PropTypes.func,
})

export const Tag = UUIFunctionComponent({
  name: 'Tag',
  nodes: {
    Root: 'div',
    Content: 'span',
  },
  propTypes: TagPropTypes,
}, (props: TagFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Content } = nodes
  return (
    <Root
      {...NodeDataProps({
        'interactive': !!props.onClick,
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