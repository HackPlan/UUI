import React from 'react';
import { UUI } from '../../utils/uui';

export interface BasePaginationProps {
  children: React.ReactNode
}

export const Pagination = UUI.FunctionComponent({
  name: 'Pagination',
  nodes: {
    Root: 'div'
  }
}, (props: BasePaginationProps, nodes) => {
  const { Root } = nodes
  return (
    <Root className={"u-flex u-flex-row u-items-center"}>
      {props.children}
    </Root>
  )
})

export type PaginationProps = Parameters<typeof Pagination>[0]