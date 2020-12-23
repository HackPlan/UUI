import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface LayoutMainFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode | string;
}

export const LayoutMain = UUIFunctionComponent({
  name: 'LayoutMain',
  nodes: {
    Root: 'main',
  },
}, (props: LayoutMainFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutMainProps = UUIFunctionComponentProps<typeof LayoutMain>