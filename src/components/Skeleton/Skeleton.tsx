import React from 'react';
import { SkeletonParagraph } from './Paragraph';
import { SkeletonTitle } from './Title';
import { SkeletonPicture } from './Picture';
import { UUI } from '../../utils/uui';

import './Skeleton.scss';


export interface SkeletonProps {
  children?: React.ReactNode | string
}

const _Skeleton = UUI.FunctionComponent({
  name: 'Skeleton',
  nodes: {
    Root: 'div'
  }
}, (props: SkeletonProps, nodes) => {
  const { Root } = nodes
  return (
    <Root>{props.children}</Root>
  )
})

const Skeleton = _Skeleton as typeof _Skeleton & {
  Paragraph: typeof SkeletonParagraph,
  Title: typeof SkeletonTitle,
  Picture: typeof SkeletonPicture,
}
Skeleton.Paragraph = SkeletonParagraph
Skeleton.Title = SkeletonTitle
Skeleton.Picture = SkeletonPicture

export { Skeleton }