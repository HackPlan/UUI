import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutMainFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode | string;
}

export const LayoutMain = UUI.FunctionComponent({
  name: 'LayoutMain',
  nodes: {
    Root: 'main',
  },
}, (props: LayoutMainFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutMainProps = Parameters<typeof LayoutMain>[0]