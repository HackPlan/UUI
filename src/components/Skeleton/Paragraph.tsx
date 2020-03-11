import React from 'react';
import { StylishProps, initStylish } from "../../utils/stylish"

export enum SkeletonParagraphNodeName {
  Root = "skeleton-paragraph",
  Line = "line",
}

export interface SkeletonParagraphProps extends StylishProps<SkeletonParagraphNodeName> {
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