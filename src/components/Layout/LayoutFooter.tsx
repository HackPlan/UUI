import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface LayoutFooterFeatureProps {
  /**
   * The container of LayoutFooter.
   */
  children?: React.ReactNode;
}

export const LayoutFooterPropTypes = createComponentPropTypes<LayoutFooterFeatureProps>({
  children: PropTypes.node,
})

export const LayoutFooter = UUIFunctionComponent({
  name: 'LayoutFooter',
  nodes: {
    Root: 'footer',
  },
  propTypes: LayoutFooterPropTypes,
}, (props: LayoutFooterFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutFooterProps = UUIFunctionComponentProps<typeof LayoutFooter>