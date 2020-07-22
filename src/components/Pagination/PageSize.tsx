import React, { useContext } from 'react';
import { UUI } from '../../core/uui';
import { PaginationContext } from './Pagination';
import { HTMLSelect } from '../Select';

export interface PageSizeFeatureProps {
  pageSizeOptions: number[];
  labelRender?: (pageSize: number) => string;
}

export const PageSize = UUI.FunctionComponent({
  name: 'PageSize',
  nodes: {
    Root: 'div',
    Select: HTMLSelect,
  }
}, (props: PageSizeFeatureProps, nodes) => {
  const { Root, Select } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PageSize> in <Pagination>')
    return <></>
  }
  const { pagination, loading } = context

  return (
    <Root>
      <Select
        disabled={loading}
        options={props.pageSizeOptions.map((i) => {
          return {
            label: props.labelRender ? props.labelRender(i) : `${i} / Page`,
            value: i,
          }
        })}
        value={pagination.limit}
        onChange={(value) => pagination.changePageSize(value)}
      />
    </Root>
  )
})

export type PageSizeProps = Parameters<typeof PageSize>[0]