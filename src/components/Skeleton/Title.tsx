import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface SkeletonTitleFeatureProps {
}

export const SkeletonTitle = UUIFunctionComponent({
  name: 'SkeletonTitle',
  nodes: {
    Root: 'h3'
  }
}, (props: SkeletonTitleFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonTitleProps = UUIFunctionComponentProps<typeof SkeletonTitle>