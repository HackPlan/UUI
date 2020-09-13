import React, { useState, useRef, useMemo, useEffect } from 'react';
import { UUI } from '../../core/uui';
import { Collapse } from '../Collapse';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { AccordionPane, AccordionPaneProps } from './AccordionPane';
import { AccordionContext } from './AccordionContext';

export interface AccordionFeatureProps {
  allowMultipleExpanded?: boolean;
  children: React.ReactElement<AccordionPaneProps>[];
}

const _Accordion = UUI.FunctionComponent({
  name: 'Accordion',
  nodes: {
    Root: 'div',
    Pane: 'div',
    Collapse: Collapse,
  },
}, (props: AccordionFeatureProps, nodes) => {
  const { Root } = nodes

  const finalProps = {
    allowMultipleExpanded: props.allowMultipleExpanded || false,
  }

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const onPaneClicked = (paneId: string) => {
    setExpandedIds((value) => {
      let newValue = new Set(value)
      if (finalProps.allowMultipleExpanded) {
        if (newValue.has(paneId)) {
          newValue.delete(paneId)
        } else {
          newValue.add(paneId)
        }
      } else {
        if (newValue.has(paneId)) {
          newValue = new Set()
        } else {
          newValue = new Set([paneId])
        }
      }
      return newValue
    })
  }

  const ref = useRef<HTMLDivElement | null>(null)

  const [panes, setPanes] = useState<HTMLElement[]>([])
  useEffect(() => {
    if (ref.current) {
      const elements: HTMLElement[] = Array.prototype.slice.call(ref.current.querySelectorAll('.UUI-AccordionPane-Root[aria-disabled=false] .UUI-AccordionPane-Header'))
      setPanes(elements)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, props.children])

  const makePaneFocus = (index: number) => {
    if (panes.length === 0) return
    const _index = (index + panes.length) % panes.length
    if (panes[_index]) panes[_index].focus()
    else panes[0].focus()
  }

  const onNextPaneFocused = () => {
    if (document.activeElement) {
      const index = panes.indexOf(document.activeElement as HTMLElement)
      makePaneFocus(index+1)
    } else {
      makePaneFocus(0)
    }
  }
  const onPrevPaneFocused = () => {
    if (document.activeElement) {
      const index = panes.indexOf(document.activeElement as HTMLElement)
      makePaneFocus(index-1)
    } else {
      makePaneFocus(0)
    }
  }
  const onFirstPaneFocused = () => {
    makePaneFocus(0)
  }
  const onLastPaneFocused = () => {
    makePaneFocus(panes.length - 1)
  }

  return (
    <AccordionContext.Provider value={{
      expandedIds, onPaneClicked,
      onNextPaneFocused, onPrevPaneFocused,
      onFirstPaneFocused, onLastPaneFocused,
    }}>
      <Root ref={ref}>
        {props.children}
      </Root>
    </AccordionContext.Provider>
  )
})

export type AccordionProps = Parameters<typeof _Accordion>[0]

const Accordion = createGroupedComponent(_Accordion, {
  Pane: AccordionPane,
})

export { Accordion };