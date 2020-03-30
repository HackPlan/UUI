import React from 'react';
import { UUI } from '../../utils/uui';

export interface BaseSkeletonPictureProps {
}

export const SkeletonPicture = UUI.FunctionComponent({
  name: 'SkeletonPicture',
  nodes: {
    Root: 'div'
  }
}, (props: BaseSkeletonPictureProps, nodes) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonPictureProps = Parameters<typeof SkeletonPicture>[0]