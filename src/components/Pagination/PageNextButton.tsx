import React, { useContext } from 'react';
import { Button as UUIButton } from '../Button';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Icons } from '../../icons/Icons';
import { PaginationContext } from './PaginationContext';
import { createComponentPropTypes } from '../../utils/createPropTypes';

export interface PageNextButtonFeatureProps {
}

export const PageNextButtonPropTypes = createComponentPropTypes<PageNextButtonFeatureProps>({})

export const PageNextButton = UUIFunctionComponent({
  name: 'PageNextButton',
  nodes: {
    Root: UUIButton,
    NextIcon: Icons.ChevronRight,
  },
  propTypes: PageNextButtonPropTypes,
}, (props: PageNextButtonFeatureProps, { nodes }) => {
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

export type PageNextButtonProps = UUIFunctionComponentProps<typeof PageNextButton>
