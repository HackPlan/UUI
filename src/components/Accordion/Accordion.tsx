import React, { useState, useRef } from 'react';
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

  return (
    <AccordionContext.Provider value={{ expandedIds, onPaneClicked }}>
      <Root>
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