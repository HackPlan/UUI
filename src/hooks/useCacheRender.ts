import { intersectionWith, isEqual, xorWith } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useList, usePrevious } from "react-use";

export function useValueCacheRender<T>(data: T, render: (data: T) => React.ReactNode, options: { comparator?: (previous: T, current: T) => boolean }) {
  const [rendered, setRendered] = useState(render(data))
  const previous = usePrevious<T>(data) as T
  const current = data

  useEffect(() => {
    const isSame = options?.comparator ? options.comparator(previous, current) : isEqual(previous, current)
    if (!isSame) {
      setRendered(render(current))
    }
  }, [previous, current, options, render])

  return rendered
}

export function useArrayCacheRender<T>(
  data: T[],
  render: (data: T) => React.ReactNode,
  options: {
    id: (i: T) => string;
    comparator?: (previous: T, current: T) => boolean;
  },
) {
  const [list, { removeAt, updateAt, push }] = useList<{
    id: string;
    rendered: React.ReactNode;
  }>([])
  const previous = usePrevious<T[]>(data) as T[]
  const current = data

  useEffect(() => {
    const isSameOne = (i: T, j: T) => options.id(i) === options.id(j)
    const intersected = intersectionWith(previous, current, isSameOne)
    const removing = xorWith(previous, intersected, isSameOne)
    const adding = xorWith(current, intersected, isSameOne)
    const updating = intersected.filter((i) => {
      const p = previous.find((j) => options.id(i) === options.id(j))
      const c = current.find((j) => options.id(i) === options.id(j))
      if (!p) return false
      if (!c) return false

      return options.comparator ? options.comparator(c, p) : !isEqual(c, p)
    })

    for (const i of removing) {
      const index = list.findIndex((r) => r.id === options.id(i))
      if (index > -1) removeAt(index)
    }
    for (const i of updating) {
      const index = list.findIndex((r) => r.id === options.id(i))
      const c = current.find((c) => options.id(c) === options.id(i))
      if (index > -1 && c) updateAt(index, { id: options.id(c), rendered: render(c) })
    }
    for (const i of adding) {
      push({ id: options.id(i), rendered: render(i) })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previous, current])

  const rendered = useMemo(() => {
    return list.map((i) => i.rendered)
  }, [list])

  return rendered
}