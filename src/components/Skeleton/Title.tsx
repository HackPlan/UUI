import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes } from '../../utils/createPropTypes';

export interface SkeletonTitleFeatureProps {
}

export const SkeletonTitlePropTypes = createComponentPropTypes<SkeletonTitleFeatureProps>({})

export const SkeletonTitle = UUIFunctionComponent({
  name: 'SkeletonTitle',
  nodes: {
    Root: 'h3'
  },
  propTypes: SkeletonTitlePropTypes,
}, (props: SkeletonTitleFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root></Root>
  )
})

export type SkeletonTitleProps = UUIFunctionComponentProps<typeof SkeletonTitle>