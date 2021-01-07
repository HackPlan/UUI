import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface LayoutNavFeatureProps {
  /**
   * The container of LayoutNav.
   */
  children?: React.ReactNode;
}

export const LayoutNavPropTypes = createComponentPropTypes<LayoutNavFeatureProps>({
  children: PropTypes.node,
})

export const LayoutNav = UUIFunctionComponent({
  name: 'LayoutNav',
  nodes: {
    Root: 'nav',
  },
  propTypes: LayoutNavPropTypes,
}, (props: LayoutNavFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutNavProps = UUIFunctionComponentProps<typeof LayoutNav>