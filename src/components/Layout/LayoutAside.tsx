import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface LayoutAsideFeatureProps {
  /**
   * The container of LayoutAside.
   */
  children?: React.ReactNode;
}

export const LayoutAside = UUIFunctionComponent({
  name: 'LayoutAside',
  nodes: {
    Root: 'aside',
  },
}, (props: LayoutAsideFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutAsideProps = UUIFunctionComponentProps<typeof LayoutAside>