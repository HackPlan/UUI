import React from 'react';
import { UUI } from '../../utils/uui';

export enum PageInfoNodeName {
  PageInfo = "pageinfo",
  Root = "root",
}

export interface PageInfoProps {
  page: number
  pageSize: number
  totalItem: number
}

export const PageInfo = UUI.FunctionComponent({
  name: 'PageInfo',
  nodes: {
    Root: 'div',
  }
}, (props: PageInfoProps, nodes) => {
  const { Root } = nodes

  const startItem = Math.max((props.page - 1) * props.pageSize + 1, 1)
  const endItem = Math.min(startItem + props.pageSize - 1, props.totalItem)
  const text = `${startItem}-${endItem} of ${props.totalItem} items`

  return (
    <Root className={"u-flex u-flex-row u-mx-2"}>
      {text}
    </Root>
  )
})