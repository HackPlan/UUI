import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface LayoutAsideFeatureProps {
  /**
   * The container of LayoutAside.
   */
  children?: React.ReactNode;
}

export const LayoutAsidePropTypes = createComponentPropTypes<LayoutAsideFeatureProps>({
  children: PropTypes.node,
})

export const LayoutAside = UUIFunctionComponent({
  name: 'LayoutAside',
  nodes: {
    Root: 'aside',
  },
  propTypes: LayoutAsidePropTypes,
}, (props: LayoutAsideFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutAsideProps = UUIFunctionComponentProps<typeof LayoutAside>