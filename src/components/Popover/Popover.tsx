import React, { useEffect } from 'react';
import { UUI } from '../../utils/uui';
import './Popover.scss';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement, Modifier } from '@popperjs/core';

export type PopoverPlacement = Exclude<Placement, ''>
export type PopoverStrategy = 'absolute' | 'fixed'

export interface BasePopoverProps {
  /**
   * Whether this popover show content.
   */
  active: boolean
  /**
   * The trigger elements of Popover.
   * The position of content depends on activator.
   */
  activator: React.ReactNode
  /**
   * The content elements of Popover
   */
  children: React.ReactNode
  /**
   * Whether the content of popover should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
   * @default true
   */
  usePortal?: boolean
  /**
   * The container element into which the overlay renders its contents, when `usePortal` is `true`.
   * This prop is ignored if `usePortal` is `false`.
   * @default document.body
   */
  portalContainer?: HTMLElement
  /**
   * The position (relative to the activator) at which the popover should appear.
   * @default 'bottom'
   */
  placement?: PopoverPlacement
  /**
   * The position strategy
   * @default absolute
   */
  strategy?: PopoverStrategy
  /**
   * Popper.js props. reference: https://popper.js.org/docs/v2/modifiers/
   */
  modifiers?: Array<Partial<Modifier<any>>>
}

export const Popover = UUI.FunctionComponent({
  name: 'Popover',
  nodes: {
    Root: 'div',
    Activator: 'div',
    Portal: 'div',
    Content: 'div',
  }
}, (props: BasePopoverProps, nodes) => {
  const { Root, Activator, Portal, Content } = nodes

  const finalProps = {
    usePortal: props.usePortal === undefined ? true : props.usePortal,
    portalContainer: props.portalContainer || document.body,
    placement: props.placement || 'bottom',
    strategy: props.strategy || 'absolute',
  }

  const [referenceElement, setReferenceElement] = React.useState<any>(null);
  const [popperElement, setPopperElement] = React.useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: finalProps.placement,
    strategy: finalProps.strategy,
  });

  useEffect(() => {
    if (popperElement) {
      popperElement.style.visibility = props.active ? 'visible' : 'hidden'
    }
  }, [props.active, popperElement])

  return (
    <Root>
      <Activator ref={setReferenceElement}>{props.activator}</Activator>
      {finalProps.usePortal ? ReactDOM.createPortal((
        <Portal className="UUI-Popover-Portal">
          <Content ref={setPopperElement} style={{...styles.popper}} {...attributes.popper}>{props.children}</Content>
        </Portal>
      ), finalProps.portalContainer) : (
        <Content ref={setPopperElement} style={{...styles.popper}} {...attributes.popper}>{props.children}</Content>
      )}
    </Root>
  )
})

export type PopoverProps = Parameters<typeof Popover>[0]
