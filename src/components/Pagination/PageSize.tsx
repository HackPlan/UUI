import React, { useContext } from 'react';
import { UUI } from '../../utils/uui';
import { PaginationContext } from './Pagination';
import { HTMLSelect } from '../Select';

export interface BasePageSizeProps {
  pageSizeOptions: number[];
}

export const PageSize = UUI.FunctionComponent({
  name: 'PageSize',
  nodes: {
    Root: 'div',
    Select: HTMLSelect,
  }
}, (props: BasePageSizeProps, nodes) => {
  const { Root, Select } = nodes

  const pagination = useContext(PaginationContext)

  return (
    <Root>
      <Select
        options={props.pageSizeOptions.map((i) => {
          return {
            label: `${i} / Page`,
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