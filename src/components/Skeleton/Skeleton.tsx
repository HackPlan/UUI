import React from 'react';
import { SkeletonParagraph } from './Paragraph';
import { SkeletonTitle } from './Title';
import { SkeletonPicture } from './Picture';
import { UUI } from '../../core/uui';
import { createGroupedComponent } from '../../utils/createGroupedComponent';


export interface SkeletonFeatureProps {
  children?: React.ReactNode | string;
}

export const _Skeleton = UUI.FunctionComponent({
  name: 'Skeleton',
  nodes: {
    Root: 'div'
  }
}, (props: SkeletonFeatureProps, nodes) => {
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
