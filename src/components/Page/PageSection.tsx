import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface PageSectionFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode;
}

export const PageSectionPropTypes = createComponentPropTypes<PageSectionFeatureProps>({
  children: PropTypes.node,
})

export const PageSection = UUIFunctionComponent({
  name: 'PageSection',
  nodes: {
    Root: 'div',
  },
  propTypes: PageSectionPropTypes,
}, (props: PageSectionFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type PageSectionProps = UUIFunctionComponentProps<typeof PageSection>