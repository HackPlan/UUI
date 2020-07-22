import React from 'react';
import { UUI } from '../../core/uui';

export interface SkeletonTitleFeatureProps {
}

export const SkeletonTitle = UUI.FunctionComponent({
  name: 'SkeletonTitle',
  nodes: {
    Root: 'h3'
  }
}, (props: SkeletonTitleFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonTitleProps = Parameters<typeof SkeletonTitle>[0]