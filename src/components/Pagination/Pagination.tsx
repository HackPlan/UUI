import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { usePagination, IPagination } from '../../hooks/usePagination';
import { PageSize } from './PageSize';
import { PageInfo } from './PageInfo';
import { PageList } from './PageList';
import { PagePrevButton } from './PagePrevButton';
import { PageNextButton } from './PageNextButton';
import { PageSelector } from './PageSelector';
import { PageJumper } from './PageJumper';
import { PaginationContext } from './PaginationContext';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

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

export const IPaginationPropTypes = createComponentPropTypes<IPagination>({
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
})

export const PaginationPropTypes = createComponentPropTypes<PaginationFeatureProps>({
  value: PropTypes.shape(IPaginationPropTypes).isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
})

export const _Pagination = UUIFunctionComponent({
  name: 'Pagination',
  nodes: {
    Root: 'div'
  },
  propTypes: PaginationPropTypes,
}, (props: PaginationFeatureProps, { nodes, NodeDataProps }) => {
  const { Root } = nodes

  const pagination = usePagination(props.value, props.onChange)

  return (
    <PaginationContext.Provider value={{ pagination, loading: props.loading }}>
      <Root
        role="navigation"
        {...NodeDataProps({
          'loading': !!props.loading,
        })}
      >
        {props.children}
      </Root>
    </PaginationContext.Provider>
  )
})

export type PaginationProps = UUIFunctionComponentProps<typeof _Pagination>

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
