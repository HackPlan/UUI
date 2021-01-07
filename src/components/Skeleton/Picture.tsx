import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes } from '../../utils/createPropTypes';

export interface SkeletonPictureFeatureProps {
}

export const SkeletonPicturePropTypes = createComponentPropTypes<SkeletonPictureFeatureProps>({})

export const SkeletonPicture = UUIFunctionComponent({
  name: 'SkeletonPicture',
  nodes: {
    Root: 'div'
  },
  propTypes: SkeletonPicturePropTypes,
}, (props: SkeletonPictureFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonPictureProps = UUIFunctionComponentProps<typeof SkeletonPicture>