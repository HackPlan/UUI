import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface LayoutMainFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode;
}

export const LayoutMainPropTypes = createComponentPropTypes<LayoutMainFeatureProps>({
  children: PropTypes.node,
})

export const LayoutMain = UUIFunctionComponent({
  name: 'LayoutMain',
  nodes: {
    Root: 'main',
  },
  propTypes: LayoutMainPropTypes,
}, (props: LayoutMainFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutMainProps = UUIFunctionComponentProps<typeof LayoutMain>