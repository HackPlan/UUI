import React, { useMemo, useContext } from 'react';
import { range } from 'lodash';
import { Button as UUIButton } from '../Button';
import { UUI } from '../../core/uui';
import { PaginationContext } from './Pagination';
import classNames from 'classnames';


export interface PageListFeatureProps {
}


export const PageList = UUI.FunctionComponent({
  name: 'PageList',
  nodes: {
    Root: 'div',
    PageButton: UUIButton,
  }
}, (props: PageListFeatureProps, nodes) => {
  const { Root, PageButton } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PageList> in <Pagination>')
    return <></>
  }
  const { pagination, loading } = context

  const pageList = useMemo(() => {
    return getEllipsisPageData(pagination.currentPage, pagination.totalPage)
  }, [pagination.currentPage, pagination.totalPage]);

  return (
    <Root>
      {pageList.map((item, index) => {
        const isPage = item.type === 'page'
        const isActive = item.type === 'active'
        const isEllipsis = item.type === 'ellipsis'
        return (
          <PageButton
            className={classNames({
              'STATE_active': isActive,
              'STATE_ellipsis': isEllipsis,
            })}
            loading={loading && isActive}
            disabled={!isPage || loading}
            key={`page-item-${index}`}
            onClick={() => { if (isPage) pagination.toNthPage(Number(item.title)) }}
          >{item.title}</PageButton>
        )
      })}
    </Root>
  )
})

export type PageListProps = Parameters<typeof PageList>[0]

const getEllipsisPageData = (currentPage: number, pageCount: number) => {
  const delta = (() => {
    if (pageCount <= 7) {
      // delta === 7: [1 2 3 4 5 6 7]
      return 7
    } else {
      // delta === 2: [1 ... 4 5 6 ... 10]
      // delta === 4: [1 2 3 4 5 ... 10]
      return currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
    }
  })()

  const _range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  }

  if (_range.start - 1 === 1 || _range.end + 1 === pageCount) {
    _range.start += 1
    _range.end += 1
  }

  let pages: any = currentPage > delta
    ? range(Math.min(_range.start, pageCount - delta), Math.min(_range.end, pageCount) + 1)
    : range(1, Math.min(pageCount, delta + 1) + 1)

  const withDots = (value: any, pair: any[]) => (pages.length + 1 !== pageCount ? pair : [value])

  if (pages[0] !== 1) {
    pages = withDots(1, [1, '...']).concat(pages)
  }

  if (pages[pages.length - 1] < pageCount) {
    pages = pages.concat(withDots(pageCount, ['...', pageCount]))
  }

  const data: {
    page: number;
    title: string;
    type: 'page' | 'ellipsis' | 'active';
  }[] = pages.map((i: any) => {
    if (i === '...') {
      return {
        page: -1,
        title: String(i),
        type: 'ellipsis',
      }
    } else {
      return {
        page: i,
        title: String(i),
        type: currentPage === i ? 'active' : 'page',
      }
    }
  })

  return data
}