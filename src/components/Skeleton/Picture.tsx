import React from 'react';
import { UUI } from '../../core/uui';

export interface SkeletonPictureFeatureProps {
}

export const SkeletonPicture = UUI.FunctionComponent({
  name: 'SkeletonPicture',
  nodes: {
    Root: 'div'
  }
}, (props: SkeletonPictureFeatureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonPictureProps = Parameters<typeof SkeletonPicture>[0]