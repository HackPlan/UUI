import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface PageSectionFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode;
}

export const PageSection = UUIFunctionComponent({
  name: 'PageSection',
  nodes: {
    Root: 'div',
  },
}, (props: PageSectionFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type PageSectionProps = UUIFunctionComponentProps<typeof PageSection>