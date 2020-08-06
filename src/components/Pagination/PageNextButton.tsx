import React, { useContext } from 'react';
import { Button as UUIButton } from '../Button';
import { UUI } from '../../core/uui';
import { Icons } from '../../icons/Icons';
import { PaginationContext } from './PaginationContext';

export interface PageNextButtonFeatureProps {
}

export const PageNextButton = UUI.FunctionComponent({
  name: 'PageNextButton',
  nodes: {
    Root: UUIButton,
    NextIcon: Icons.ChevronRight,
  }
}, (props: PageNextButtonFeatureProps, nodes) => {
  const { Root, NextIcon } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PageNextButton> in <Pagination>')
    return <></>
  }
  const { pagination, loading } = context

  return (
    <Root
      disabled={pagination.currentPage === pagination.totalPage || loading}
      onClick={() => { pagination.toNextPage() }}
    >
      <NextIcon />
    </Root>
  )
})

export type PageNextButtonProps = Parameters<typeof PageNextButton>[0]
