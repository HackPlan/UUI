import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from "../../utils/stylish"

export enum SkeletonPictureNodeName {
  Root = "skeleton-picture",
}

export interface SkeletonPictureProps extends ExtraClassNameProps<SkeletonPictureNodeName>, ExtraStyleProps<SkeletonPictureNodeName> {
}

export function SkeletonPicture(props: SkeletonPictureProps) {
  const getStylishProps = initStylish<SkeletonPictureNodeName>(SkeletonPictureNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', [])}></div>
  )
}