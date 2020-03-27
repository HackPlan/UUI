import React from 'react';
import { UUI } from '../../utils/uui';

export interface SkeletonTitleProps {
}

export const SkeletonTitle = UUI.FunctionComponent({
  name: 'SkeletonTitle',
  nodes: {
    Root: 'h3'
  }
}, (props: SkeletonTitleProps, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})