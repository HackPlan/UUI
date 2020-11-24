import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface SkeletonPictureFeatureProps {
}

export const SkeletonPicture = UUIFunctionComponent({
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

export type SkeletonPictureProps = UUIFunctionComponentProps<typeof SkeletonPicture>