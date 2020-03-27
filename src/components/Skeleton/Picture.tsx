import React from 'react';
import { UUI } from '../../utils/uui';

export interface SkeletonPictureProps {
}

export const SkeletonPicture = UUI.FunctionComponent({
  name: 'SkeletonPicture',
  nodes: {
    Root: 'div'
  }
}, (props: SkeletonPictureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})