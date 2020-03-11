import React from 'react';
import { StylishProps, initStylish } from "../../utils/stylish"

export enum SkeletonPictureNodeName {
  Root = "skeleton-picture",
}

export interface SkeletonPictureProps extends StylishProps<SkeletonPictureNodeName> {
}

export function SkeletonPicture(props: SkeletonPictureProps) {
  const getStylishProps = initStylish<SkeletonPictureNodeName>(SkeletonPictureNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', [])}></div>
  )
}