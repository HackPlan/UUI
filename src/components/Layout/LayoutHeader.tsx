import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface LayoutHeaderFeatureProps {
  /**
   * The container of LayoutHeader.
   */
  children?: React.ReactNode;
}

export const LayoutHeaderPropTypes = createComponentPropTypes<LayoutHeaderFeatureProps>({
  children: PropTypes.node,
})

export const LayoutHeader = UUIFunctionComponent({
  name: 'LayoutHeader',
  nodes: {
    Root: 'header',
  },
  propTypes: LayoutHeaderPropTypes,
}, (props: LayoutHeaderFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutHeaderProps = UUIFunctionComponentProps<typeof LayoutHeader>