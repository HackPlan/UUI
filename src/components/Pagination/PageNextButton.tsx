import React, { useContext } from 'react';
import { Button as UUIButton } from '../Button';
import { UUI } from '../../core/uui';
import { Icons } from '../../icons/Icons';
import { PaginationContext } from './Pagination';

export interface BasePageNextButtonProps {
}

export const PageNextButton = UUI.FunctionComponent({
  name: 'PageNextButton',
  nodes: {
    Root: UUIButton,
  }
}, (props: BasePageNextButtonProps, nodes) => {
  const { Root } = nodes

  const pagination = useContext(PaginationContext)
  if (!pagination) {
    console.warn('[UUI] please use <PageNextButton> in <Pagination>')
    return <></>
  }

  return (
    <Root
      disabled={pagination.currentPage === pagination.totalPage}
      onClick={() => { pagination.toNextPage() }}
    >
      <Icons.ChevronRight></Icons.ChevronRight>
    </Root>
  )
})

export type PageNextButtonProps = Parameters<typeof PageNextButton>[0]
