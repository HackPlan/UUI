import React from 'react';
import { initStylish, StylishProps } from '../../utils/stylish';
import { SkeletonParagraph } from './Paragraph';
import { SkeletonTitle } from './Title';
import { SkeletonPicture } from './Picture';

import './Skeleton.scss';

export enum SkeletonNodeName {
  Root = "skeleton",
}

export interface SkeletonProps extends StylishProps<SkeletonNodeName> {
  animated?: boolean
  children?: React.ReactNode | string
}

function Skeleton(props: SkeletonProps) {
  const getStylishProps = initStylish<SkeletonNodeName>(SkeletonNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', [], {}, props.children)} />
  )
}

Skeleton.Paragraph = SkeletonParagraph;
Skeleton.Title = SkeletonTitle;
Skeleton.Picture = SkeletonPicture;
export { Skeleton };