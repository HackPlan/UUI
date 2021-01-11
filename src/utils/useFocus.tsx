import { useRef, useMemo, useCallback } from "react";
import ReactHelper from "./ReactHelper";

const tabbableNode = /input|select|textarea|button|object/
export const focusSelector =
  'a, input, select, textarea, button, object, [tabindex]'

function hidden(el: HTMLElement) {
  if (process.env.NODE_ENV === 'test') return false
  return (
    (el.offsetWidth <= 0 && el.offsetHeight <= 0) || el.style.display === 'none'
  )
}

function visible(element: HTMLElement) {
  let parentElement: HTMLElement = element
  while (parentElement) {
    if (parentElement === ReactHelper.document?.body) break
    if (hidden(parentElement)) return false
    parentElement = parentElement.parentNode as HTMLElement
  }

  return true
}

function getElementTabIndex(element: HTMLElement) {
  let tabIndex: string | null | undefined = element.getAttribute('tabindex')
  if (tabIndex === null) tabIndex = undefined
  return parseInt(tabIndex as string, 10)
}

function focusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase()
  const isTabIndexNotNaN = !isNaN(getElementTabIndex(element))
  const res =
    (tabbableNode.test(nodeName) && !(element as any).disabled) ||
    (element instanceof HTMLAnchorElement
      ? element.href || isTabIndexNotNaN
      : isTabIndexNotNaN)

  return res && visible(element)
}

function tabbable(element: HTMLElement) {
  const tabIndex = getElementTabIndex(element)
  const isTabIndexNaN = isNaN(tabIndex)
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element)
}

/**
 * Tabbable elements are elements the user can tab between. This excludes elements with tabIndex=-1
 * */
function findTabbableDescendants(
  element: HTMLElement,
): Array<HTMLElement> {
  return Array.from(
    element.querySelectorAll<HTMLElement>(focusSelector),
  ).filter(tabbable)
}

export function useFocus() {
  const ref = useRef<any | null>(null)

  const elements: HTMLElement[] = useMemo(() => {
    if (!ref.current) return []
    return findTabbableDescendants(ref.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  const makePaneFocus = useCallback((index: number) => {
    if (elements.length === 0) return
    const _index = (index + elements.length) % elements.length
    if (elements[_index]) elements[_index].focus()
    else elements[0].focus()
  }, [elements])

  const focusFirst = useCallback(() => {
    makePaneFocus(0)
  }, [makePaneFocus])

  const focusLast = useCallback(() => {
    makePaneFocus(elements.length-1)
  }, [elements.length, makePaneFocus])

  const focusNext = useCallback(() => {
    if (document.activeElement) {
      const index = elements.indexOf(document.activeElement as HTMLElement)
      makePaneFocus(index+1)
    } else {
      makePaneFocus(0)
    }
  }, [elements, makePaneFocus])

  const focusPrev = useCallback(() => {
    if (document.activeElement) {
      const index = elements.indexOf(document.activeElement as HTMLElement)
      makePaneFocus(index-1)
    } else {
      makePaneFocus(0)
    }
  }, [elements, makePaneFocus])

  return {
    ref,
    methods: {
      focusFirst, focusLast,
      focusNext, focusPrev,
    }
  }
}