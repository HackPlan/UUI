import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface LayoutFooterFeatureProps {
  /**
   * The container of LayoutFooter.
   */
  children?: React.ReactNode;
}

export const LayoutFooter = UUIFunctionComponent({
  name: 'LayoutFooter',
  nodes: {
    Root: 'footer',
  },
}, (props: LayoutFooterFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutFooterProps = UUIFunctionComponentProps<typeof LayoutFooter>