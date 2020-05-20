import React from 'react';
import { UUI } from '../../utils/uui';

export interface BasePageInfoProps {
  /**
   * Current page
   */
  page: number;
  /**
   * The Size of per page
   */
  pageSize: number;
  /**
   * Total item number
   */
  totalItem: number;
  /**
   * custom info display
   */
  onRender?: (startItem: number, endItem: number, totalItem: number) => JSX.Element
}

export const PageInfo = UUI.FunctionComponent({
  name: 'PageInfo',
  nodes: {
    Root: 'div',
  }
}, (props: BasePageInfoProps, nodes) => {
  const { Root } = nodes

  const startItem = Math.max((props.page - 1) * props.pageSize + 1, 1)
  const endItem = Math.min(startItem + props.pageSize - 1, props.totalItem)
  const text = `${startItem}-${endItem} of ${props.totalItem} items`

  return (
    <Root>
      {props.onRender ? props.onRender(startItem, endItem, props.totalItem) : text}
    </Root>
  )
})

export type PageInfoProps = Parameters<typeof PageInfo>[0]