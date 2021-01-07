import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface CollapseFeatureProps {
  opened: boolean;
  children: React.ReactNode;
}

export const CollapsePropTypes = createComponentPropTypes<CollapseFeatureProps>({
  opened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
})

export const Collapse = UUIFunctionComponent({
  name: 'Collapse',
  nodes: {
    Root: 'div',
  },
  propTypes: CollapsePropTypes,
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
