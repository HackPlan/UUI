import React, { useContext } from 'react';
import { UUI } from '../../core/uui';
import { PaginationContext } from './PaginationContext';
import { HTMLSelect } from '../Select';
import { range } from 'lodash-es';

export interface PageSelectorFeatureProps {
  labelRender?: (currentPage: number, totalPage: number) => string;
}

export const PageSelector = UUI.FunctionComponent({
  name: 'PageSelector',
  nodes: {
    Root: 'div',
    Select: HTMLSelect,
  }
}, (props: PageSelectorFeatureProps, nodes) => {
  const { Root, Select } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PageSelector> in <Pagination>')
    return <></>
  }
  const { pagination, loading } = context

  const pageNumbers = range(1, pagination.totalPage+1)

  return (
    <Root>
      <Select
        disabled={loading}
        options={pageNumbers.map((i) => {
          return {
            label: props.labelRender ? props.labelRender(i, pagination.totalPage) : `${i} / ${pagination.totalPage}`,
            value: i,
          }
        })}
        value={pagination.currentPage}
        onChange={(value) => pagination.toNthPage(value)}
      />
    </Root>
  )
})

export type PageSelectorProps = Parameters<typeof PageSelector>[0]