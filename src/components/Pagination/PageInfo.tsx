import React, { useContext } from 'react';
import { UUI } from '../../core/uui';
import { PaginationContext } from './Pagination';

export interface BasePageInfoProps {
  /**
   * custom info display
   */
  onRender?: (startItem: number, endItem: number, totalItem: number) => React.ReactNode;
}

export const PageInfo = UUI.FunctionComponent({
  name: 'PageInfo',
  nodes: {
    Root: 'div',
  }
}, (props: BasePageInfoProps, nodes) => {
  const { Root } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PageInfo> in <Pagination>')
    return <></>
  }
  const { pagination } = context

  const startItem = Math.max((pagination.currentPage - 1) * pagination.limit + 1, 1)
  const endItem = Math.min(startItem + pagination.limit - 1, pagination.count)
  const text = `${startItem}-${endItem} of ${pagination.count} items`

  return (
    <Root>
      {props.onRender ? props.onRender(startItem, endItem, pagination.count) : text}
    </Root>
  )
})

export type PageInfoProps = Parameters<typeof PageInfo>[0]