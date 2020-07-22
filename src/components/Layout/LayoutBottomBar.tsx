import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutBottomBarFeatureProps {
  /**
   * The container of LayoutBottomBar.
   */
  children?: React.ReactNode;
}

export const LayoutBottomBar = UUI.FunctionComponent({
  name: 'LayoutBottomBar',
  nodes: {
    Root: 'div',
  },
}, (props: LayoutBottomBarFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>

      {props.children}
    </Root>
  )
})

export type LayoutBottomBarProps = Parameters<typeof LayoutBottomBar>[0]