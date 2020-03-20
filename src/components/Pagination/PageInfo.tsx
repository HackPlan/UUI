import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

export enum PageInfoNodeName {
  PageInfo = "pageinfo",
  Root = "root",
}

export interface PageInfoProps extends StylishProps<PageInfoNodeName> {
  page: number
  pageSize: number
  totalItem: number
}

export function PageInfo(props: PageInfoProps) {

  // Initial Nodes
  const [
    Root,
  ] = useMemo(() => {
    const stylished = initStylished(PageInfoNodeName.PageInfo, props, { prefix: "uui" })
    return [
      stylished.element('div', PageInfoNodeName.Root),
    ]
  }, [])

  const startItem = Math.max((props.page - 1) * props.pageSize + 1, 1)
  const endItem = Math.min(startItem + props.pageSize - 1, props.totalItem)
  const text = `${startItem}-${endItem} of ${props.totalItem} items`

  return (
    <Root className={"u-flex u-flex-row u-mx-2"}>
      {text}
    </Root>
  )
}