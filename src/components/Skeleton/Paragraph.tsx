import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from "../../utils/stylishHelper"

export enum SkeletonParagraphNodeName {
  Root = "skeleton-paragraph",
  Line = "line",
}

export interface SkeletonParagraphProps extends ExtraClassNameProps<SkeletonParagraphNodeName>, ExtraStyleProps<SkeletonParagraphNodeName> {
  lines?: number
}

export function SkeletonParagraph(props: SkeletonParagraphProps) {
  const getStylishProps = initStylish<SkeletonParagraphNodeName>(SkeletonParagraphNodeName.Root, props, { prefix: "uui" })
  const lines = props.lines || 3
  return (
    <div {...getStylishProps(SkeletonParagraphNodeName.Root, [])}>
      {(new Array(lines)).fill(1).map(() => {
        return (
          <p {...getStylishProps(SkeletonParagraphNodeName.Line, [])}></p>
        )
      })}
    </div>
  )
}