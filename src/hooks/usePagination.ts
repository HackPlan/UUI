import { useMemo, useState, useRef } from 'react';

export interface IPagination {
  offset: number;
  limit: number;
  count: number;
}

export const EmptyPagination = (): IPagination => ({
  offset: 0,
  limit: 50,
  count: 0,
})

/**
 * There are two states inside the hooks: `pagination` and `pagination`.
 * `pagination` used for current pagination status,
 * `pagination` used for next pagination status returned by the server.
 *
 * To change page, you should call `toNextPage`, `toPrevPage` or `toNthPage` to update offset.
 * To update server returned pagination, you should call `setServerPagination`.
 * @param _pagination initial pagination - Default: `EmptyPagination`
 */
export function usePagination(
  value: IPagination,
  onChange: (pagination: IPagination) => void,
) {
  const prevOffset = useMemo(() => value.offset - value.limit, [value.offset, value.limit])
  const nextOffset = useMemo(() => value.offset + value.limit, [value.offset, value.limit])

  const hasPrevious = useMemo(() => prevOffset >= 0, [prevOffset])
  const hasNext = useMemo(() => nextOffset < value.count, [nextOffset, value.count])
  const currentPage = useMemo(
    () => {
      if (value.offset === 0) return 1
      return value.offset && value.limit ? Math.floor(value.offset / value.limit) + 1 : 0
    },
    [value.offset, value.limit],
  )
  const totalPage = useMemo(() => value.limit ? Math.ceil(value.count / value.limit) : 0, [value.count, value.limit])

  const toNextPage = () => {
    onChange({ offset: nextOffset, limit: value.limit, count: value.count })
  }
  const toPrevPage = () => {
    onChange({ offset: Math.max(0, prevOffset), limit: value.limit, count: value.count })
  }
  const toNthPage = (n: number) => {
    onChange({ offset: Math.min((n-1) * value.limit, value.count), limit: value.limit, count: value.count })
  }

  return {
    ...value,
    currentPage,
    totalPage,
    toNextPage,
    toPrevPage,
    toNthPage,
    hasPrevious,
    hasNext,
  }
}
