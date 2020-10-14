import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutAsideFeatureProps {
  /**
   * The container of LayoutAside.
   */
  children?: React.ReactNode;
}

export const LayoutAside = UUI.FunctionComponent({
  name: 'LayoutAside',
  nodes: {
    Root: 'aside',
  },
}, (props: LayoutAsideFeatureProps, nodes) => {
  const { Root } = nodes

  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutAsideProps = Parameters<typeof LayoutAside>[0]