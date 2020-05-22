import React from 'react';
import { UUI } from '../../utils/uui';
import { usePagination, IPagination } from '../../hooks/usePagination';

export interface PaginationContext extends ReturnType<typeof usePagination> {
}

export interface BasePaginationProps {
  value: IPagination;
  onChange: (value: IPagination) => void;
  children: React.ReactNode;
}

export const PaginationContext = React.createContext<PaginationContext | null>(null)

export const Pagination = UUI.FunctionComponent({
  name: 'Pagination',
  nodes: {
    Root: 'div'
  }
}, (props: BasePaginationProps, nodes) => {
  const { Root } = nodes

  const pagination = usePagination(props.value, props.onChange)

  return (
    <PaginationContext.Provider value={pagination}>
      <Root className={"flex flex-row items-center"}>
        {props.children}
      </Root>
    </PaginationContext.Provider>
  )
})

export type PaginationProps = Parameters<typeof Pagination>[0]