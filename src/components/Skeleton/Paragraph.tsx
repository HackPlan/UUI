import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface SkeletonParagraphFeatureProps {
  lines?: number;
}

export const SkeletonParagraph = UUIFunctionComponent({
  name: 'SkeletonParagraph',
  nodes: {
    Root: 'div',
    Line: 'p',
  }
}, (props: SkeletonParagraphFeatureProps, nodes) => {
  const { Root, Line } = nodes
  const lines = props.lines || 3
  return (
    <Root>
      {(new Array(lines)).fill(1).map((i, index) => {
        return (
          <Line key={index}></Line>
        )
      })}
    </Root>
  )
})

export type SkeletonParagraphProps = UUIFunctionComponentProps<typeof SkeletonParagraph>