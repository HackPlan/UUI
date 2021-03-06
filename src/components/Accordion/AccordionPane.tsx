import React, { useContext, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Collapse } from '../Collapse';
import { Icons } from '../../icons/Icons';
import { AccordionContext } from './AccordionContext';
import { KeyCode } from '../../utils/keyboardHelper';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface AccordionPaneFeatureProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export const AccordionPanePropTypes = createComponentPropTypes<AccordionPaneFeatureProps>({
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
})

export const AccordionPane = UUIFunctionComponent({
  name: 'AccordionPane',
  nodes: {
    Root: 'div',
    Header: 'div',
    Icon: Icons.ChevronRight,
    Title: 'div',
    Collapse: Collapse,
    Content: 'div',
  },
  propTypes: AccordionPanePropTypes,
}, (props: AccordionPaneFeatureProps, { nodes, NodeDataProps }) => {
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
      {...NodeDataProps({
        'id': props.id,
        'expanded': !!expanded,
        'disabled': !!finalProps.disabled,
      })}
      role="button"
      aria-expanded={expanded}
      aria-disabled={finalProps.disabled}
      data-pane-id={props.id}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            if (!finalProps.disabled) context.onPaneClicked(props.id)
            break
          case KeyCode.ArrowDown:
            context.onNextPaneFocused && context.onNextPaneFocused()
            break
          case KeyCode.ArrowUp:
            context.onPrevPaneFocused && context.onPrevPaneFocused()
            break
          case KeyCode.Home:
            context.onFirstPaneFocused && context.onFirstPaneFocused()
            break
          case KeyCode.End:
            context.onLastPaneFocused && context.onLastPaneFocused()
            break
          default:
            // do nothing
        }
      }}
    >
      <Header tabIndex={finalProps.disabled ? -1 : 0} onClick={() => {
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

export type AccordionPaneProps = UUIFunctionComponentProps<typeof AccordionPane>
