import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutTopBarFeatureProps {
  /**
   * The container of LayoutTopBar.
   */
  children?: React.ReactNode;
}

export const LayoutTopBar = UUI.FunctionComponent({
  name: 'LayoutTopBar',
  nodes: {
    Root: 'header',
  },
}, (props: LayoutTopBarFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutTopBarProps = Parameters<typeof LayoutTopBar>[0]