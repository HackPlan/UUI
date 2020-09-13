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
import classNames from 'classnames';
import { PaginationContext } from './PaginationContext';
import { createGroupedComponent } from '../../utils/createGroupedComponent';

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
      <Root
        className={classNames({
          'STATE_loading': props.loading,
        })}
      >
        {props.children}
      </Root>
    </PaginationContext.Provider>
  )
})

export type PaginationProps = Parameters<typeof _Pagination>[0]

const Pagination = createGroupedComponent(_Pagination, {
  PageSize,
  PageInfo,
  PageList,
  PagePrevButton,
  PageNextButton,
  PageSelector,
  PageJumper,
})

export { Pagination }
