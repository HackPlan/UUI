import React, { useState } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Collapse } from '../Collapse';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { AccordionPane, AccordionPaneProps } from './AccordionPane';
import { AccordionContext } from './AccordionContext';
import { useFocus } from '../../utils/useFocus';

export interface AccordionFeatureProps {
  allowMultipleExpanded?: boolean;
  children: React.ReactElement<AccordionPaneProps>[];
}

const _Accordion = UUIFunctionComponent({
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

  const {
    ref,
    methods: { focusFirst, focusLast, focusNext, focusPrev }
  } = useFocus()

  return (
    <AccordionContext.Provider value={{
      expandedIds, onPaneClicked,
      onNextPaneFocused: focusNext, onPrevPaneFocused: focusPrev,
      onFirstPaneFocused: focusFirst, onLastPaneFocused: focusLast,
    }}>
      <Root ref={ref}>
        {props.children}
      </Root>
    </AccordionContext.Provider>
  )
})

export type AccordionProps = UUIFunctionComponentProps<typeof _Accordion>

const Accordion = createGroupedComponent(_Accordion, {
  Pane: AccordionPane,
})

export { Accordion };