import React from 'react';
import { UUI } from '../../utils/uui';

export interface SkeletonParagraphProps {
  lines?: number
}

export const SkeletonParagraph = UUI.FunctionComponent({
  name: 'SkeletonParagraph',
  nodes: {
    Root: 'div',
    Line: 'p',
  }
}, (props: SkeletonParagraphProps, nodes) => {
  const { Root, Line } = nodes
  const lines = props.lines || 3
  return (
    <Root>
      {(new Array(lines)).fill(1).map(() => {
        return (
          <Line></Line>
        )
      })}
    </Root>
  )
})