import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface LayoutHeaderFeatureProps {
  /**
   * The container of LayoutHeader.
   */
  children?: React.ReactNode;
}

export const LayoutHeader = UUIFunctionComponent({
  name: 'LayoutHeader',
  nodes: {
    Root: 'header',
  },
}, (props: LayoutHeaderFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutHeaderProps = UUIFunctionComponentProps<typeof LayoutHeader>