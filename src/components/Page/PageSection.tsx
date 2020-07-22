import React from 'react';
import { UUI } from '../../core/uui';

export interface PageSectionFeatureProps {
  /**
   * The content of tag.
   */
  children?: React.ReactNode;
}

export const PageSection = UUI.FunctionComponent({
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

export type PageSectionProps = Parameters<typeof PageSection>[0]