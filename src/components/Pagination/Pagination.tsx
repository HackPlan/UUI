import React from 'react';
import { UUI } from '../../core/uui';
import { usePagination, IPagination } from '../../hooks/usePagination';
import { PageSize } from './PageSize';
import { PageInfo } from './PageInfo';
import { PageList } from './PageList';
import { PagePrevButton } from './PagePrevButton';
import { PageNextButton } from './PageNextButton';
import { PageSelector } from './PageSelector';
import { PageJumper } from './PageJumper';

export interface PaginationContext extends ReturnType<typeof usePagination> {
}

export interface PaginationFeatureProps {
  value: IPagination;
  onChange: (value: IPagination) => void;
  /**
   * Whether the pagination is loading.
   * @default false
   */
  loading?: boolean;
  children: React.ReactNode;
}

export interface PaginationContextValue {
  pagination: PaginationContext;
  loading?: boolean;
}
export const PaginationContext = React.createContext<PaginationContextValue | null>(null)

export const _Pagination = UUI.FunctionComponent({
  name: 'Pagination',
  nodes: {
    Root: 'div'
  }
}, (props: PaginationFeatureProps, nodes) => {
  const { Root } = nodes

  const pagination = usePagination(props.value, props.onChange)

  return (
    <PaginationContext.Provider value={{ pagination, loading: props.loading }}>
      <Root className={"flex flex-row items-center"}>
        {props.children}
      </Root>
    </PaginationContext.Provider>
  )
})

export type PaginationProps = Parameters<typeof _Pagination>[0]

const Pagination = _Pagination as typeof _Pagination & {
  PageSize: typeof PageSize;
  PageInfo: typeof PageInfo;
  PageList: typeof PageList;
  PagePrevButton: typeof PagePrevButton;
  PageNextButton: typeof PageNextButton;
  PageSelector: typeof PageSelector;
  PageJumper: typeof PageJumper;
}

Pagination.PageSize = PageSize;
Pagination.PageInfo = PageInfo;
Pagination.PageList = PageList;
Pagination.PagePrevButton = PagePrevButton;
Pagination.PageNextButton = PageNextButton;
Pagination.PageSelector = PageSelector;
Pagination.PageJumper = PageJumper;

export { Pagination }
