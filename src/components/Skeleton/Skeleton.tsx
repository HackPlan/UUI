import React from 'react';
import { SkeletonParagraph } from './Paragraph';
import { SkeletonTitle } from './Title';
import { SkeletonPicture } from './Picture';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';


export interface SkeletonFeatureProps {
  children?: React.ReactNode;
}

export const SkeletonPropTypes = createComponentPropTypes<SkeletonFeatureProps>({
  children: PropTypes.node,
})

export const _Skeleton = UUIFunctionComponent({
  name: 'Skeleton',
  nodes: {
    Root: 'div'
  },
  propTypes: SkeletonPropTypes,
}, (props: SkeletonFeatureProps, { nodes }) => {
  const { Root } = nodes
  return (
    <Root>{props.children}</Root>
  )
})

const Skeleton = createGroupedComponent(_Skeleton, {
  Paragraph: SkeletonParagraph,
  Title: SkeletonTitle,
  Picture: SkeletonPicture,
})

export { Skeleton }

export type SkeletonProps = UUIFunctionComponentProps<typeof _Skeleton>
