import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutHeaderFeatureProps {
  /**
   * The container of LayoutHeader.
   */
  children?: React.ReactNode;
}

export const LayoutHeader = UUI.FunctionComponent({
  name: 'LayoutHeader',
  nodes: {
    Root: 'header',
  },
}, (props: LayoutHeaderFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutHeaderProps = Parameters<typeof LayoutHeader>[0]