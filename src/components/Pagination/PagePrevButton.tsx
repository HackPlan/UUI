import React, { useContext } from 'react';
import { Button as UUIButton } from '../Button';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Icons } from '../../icons/Icons';
import { PaginationContext } from './PaginationContext';

export interface PagePrevButtonFeatureProps {
}

export const PagePrevButton = UUIFunctionComponent({
  name: 'PagePrevButton',
  nodes: {
    Root: UUIButton,
    PrevIcon: Icons.ChevronLeft,
  }
}, (props: PagePrevButtonFeatureProps, { nodes }) => {
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

export type PagePrevButtonProps = UUIFunctionComponentProps<typeof PagePrevButton>
