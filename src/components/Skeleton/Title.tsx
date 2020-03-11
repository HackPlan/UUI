import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from "../../utils/stylish"

export enum SkeletonTitleNodeName {
  Root = "skeleton-title",
}

export interface SkeletonTitleProps extends ExtraClassNameProps<SkeletonTitleNodeName>, ExtraStyleProps<SkeletonTitleNodeName> {
}

export function SkeletonTitle(props: SkeletonTitleProps) {
  const getStylishProps = initStylish<SkeletonTitleNodeName>(SkeletonTitleNodeName.Root, props, { prefix: "uui" })
  return (
    <h3 {...getStylishProps('', [])}></h3>
  )
}