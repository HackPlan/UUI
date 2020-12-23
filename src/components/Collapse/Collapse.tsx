import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface CollapseFeatureProps {
  opened: boolean;
  children: React.ReactNode;
}

export const Collapse = UUIFunctionComponent({
  name: 'Collapse',
  nodes: {
    Root: 'div',
  },
}, (props: CollapseFeatureProps, { nodes, NodeDataProps }) => {
  const { Root } = nodes

  return (
    <Root
      {...NodeDataProps({
        'opened': props.opened,
      })}
    >
      {props.children}
    </Root>
  )
})

export type CollapseProps = UUIFunctionComponentProps<typeof Collapse>
