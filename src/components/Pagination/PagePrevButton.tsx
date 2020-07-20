import React, { useContext } from 'react';
import { Button as UUIButton } from '../Button';
import { UUI } from '../../core/uui';
import { Icons } from '../../icons/Icons';
import { PaginationContext } from './Pagination';

export interface BasePagePrevButtonProps {
}

export const PagePrevButton = UUI.FunctionComponent({
  name: 'PagePrevButton',
  nodes: {
    Root: UUIButton,
    PrevIcon: Icons.ChevronLeft,
  }
}, (props: BasePagePrevButtonProps, nodes) => {
  const { Root, PrevIcon } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PagePrevButton> in <Pagination>')
    return <></>
  }
  const { pagination, loading } = context

  return (
    <Root
      disabled={pagination.currentPage === 1 || loading}
      onClick={() => { pagination.toPrevPage() }}
    >
      <PrevIcon />
    </Root>
  )
})

export type PagePrevButtonProps = Parameters<typeof PagePrevButton>[0]
