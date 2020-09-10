import React, { useState, useContext, useMemo } from 'react';
import { UUI } from '../../core/uui';
import { Collapse } from '../Collapse';
import { Icons } from '../../icons/Icons';
import classNames from 'classnames';
import { AccordionContext } from './AccordionContext';

export interface AccordionPaneFeatureProps {
  id: string;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const AccordionPane = UUI.FunctionComponent({
  name: 'AccordionPane',
  nodes: {
    Root: 'div',
    Header: 'div',
    Icon: Icons.ChevronRight,
    Title: 'div',
    Collapse: Collapse,
    Content: 'div',
  },
}, (props: AccordionPaneFeatureProps, nodes) => {
  const { Root, Header, Icon, Title, Collapse, Content } = nodes

  const finalProps = {
    disabled: props.disabled || false,
  }

  const context = useContext(AccordionContext)
  if (!context) {
    console.warn('[UUI] please use <Accordion.Pane> in <Accordion>')
    return <></>
  }

  const expanded = useMemo(() => {
    return context.expandedIds.has(props.id)
  }, [context.expandedIds, props.id])

  return (
    <Root
      className={classNames({
        [`ID_${props.id}`]: !!props.id,
        'STATE_expanded': expanded,
        'STATE_disabled': finalProps.disabled,
      })}
      role="button"
      aria-expanded={expanded}
      aria-disabled={finalProps.disabled}
    >
      <Header tabIndex={0} onClick={() => {
        if (finalProps.disabled) return
        context.onPaneClicked(props.id)
      }}>
        <Icon></Icon>
        <Title>{props.title}</Title>
      </Header>
      <Collapse opened={expanded}>
        <Content role="region">{props.children}</Content>
      </Collapse>
    </Root>
  )
})

export type AccordionPaneProps = Parameters<typeof AccordionPane>[0]
