import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutContentFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode | string;
}

export const LayoutContent = UUI.FunctionComponent({
  name: 'LayoutContent',
  nodes: {
    Root: 'div',
  },
}, (props: LayoutContentFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutContentProps = Parameters<typeof LayoutContent>[0]