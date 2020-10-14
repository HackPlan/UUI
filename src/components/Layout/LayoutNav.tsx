import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutNavFeatureProps {
  /**
   * The container of LayoutNav.
   */
  children?: React.ReactNode;
}

export const LayoutNav = UUI.FunctionComponent({
  name: 'LayoutNav',
  nodes: {
    Root: 'nav',
  },
}, (props: LayoutNavFeatureProps, nodes) => {
  const { Root } = nodes

  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutNavProps = Parameters<typeof LayoutNav>[0]