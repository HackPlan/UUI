import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylish';
import { SkeletonParagraph } from './Paragraph';
import { SkeletonTitle } from './Title';
import { SkeletonPicture } from './Picture';

import './Skeleton.scss';

export enum SkeletonNodeName {
  Root = "skeleton",
}

export interface SkeletonProps extends ExtraClassNameProps<SkeletonNodeName>, ExtraStyleProps<SkeletonNodeName> {
  animated?: boolean
  children?: React.ReactNode | string
}

function Skeleton(props: SkeletonProps) {
  const getStylishProps = initStylish<SkeletonNodeName>(SkeletonNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', [])}>
      {props.children}
    </div>
  )
}

Skeleton.Paragraph = SkeletonParagraph;
Skeleton.Title = SkeletonTitle;
Skeleton.Picture = SkeletonPicture;
export { Skeleton };