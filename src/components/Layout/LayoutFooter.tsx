import React from 'react';
import { UUI } from '../../core/uui';

export interface LayoutFooterFeatureProps {
  /**
   * The container of LayoutFooter.
   */
  children?: React.ReactNode;
}

export const LayoutFooter = UUI.FunctionComponent({
  name: 'LayoutFooter',
  nodes: {
    Root: 'footer',
  },
}, (props: LayoutFooterFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>

      {props.children}
    </Root>
  )
})

export type LayoutFooterProps = Parameters<typeof LayoutFooter>[0]