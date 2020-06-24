import React, { useContext } from 'react';
import { UUI } from '../../core/uui';
import { PaginationContext } from './Pagination';
import { HTMLSelect } from '../Select';
import { range } from 'lodash';

export interface BasePageSelectorProps {
  labelRender?: (currentPage: number, totalPage: number) => string;
}

export const PageSelector = UUI.FunctionComponent({
  name: 'PageSelector',
  nodes: {
    Root: 'div',
    Select: HTMLSelect,
  }
}, (props: BasePageSelectorProps, nodes) => {
  const { Root, Select } = nodes

  const pagination = useContext(PaginationContext)
  if (!pagination) {
    console.warn('[UUI] please use <PageSelector> in <Pagination>')
    return <></>
  }

  const pageNumbers = range(1, pagination.totalPage+1)

  return (
    <Root>
      <Select
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