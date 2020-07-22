import React from 'react';
import { UUI } from '../../core/uui';

export interface SkeletonParagraphFeatureProps {
  lines?: number;
}

export const SkeletonParagraph = UUI.FunctionComponent({
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

export type SkeletonParagraphProps = Parameters<typeof SkeletonParagraph>[0]