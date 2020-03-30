import React from 'react';
import { UUI } from '../../utils/uui';

export interface BaseSkeletonTitleProps {
}

export const SkeletonTitle = UUI.FunctionComponent({
  name: 'SkeletonTitle',
  nodes: {
    Root: 'h3'
  }
}, (props: BaseSkeletonTitleProps, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonTitleProps = Parameters<typeof SkeletonTitle>[0]