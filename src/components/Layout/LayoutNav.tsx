import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface LayoutNavFeatureProps {
  /**
   * The container of LayoutNav.
   */
  children?: React.ReactNode;
}

export const LayoutNav = UUIFunctionComponent({
  name: 'LayoutNav',
  nodes: {
    Root: 'nav',
  },
}, (props: LayoutNavFeatureProps, { nodes }) => {
  const { Root } = nodes

  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutNavProps = UUIFunctionComponentProps<typeof LayoutNav>