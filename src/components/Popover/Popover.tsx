import React, { useEffect, useRef, useState, useMemo } from 'react';
import { UUI } from '../../utils/uui';
import './Popover.scss';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement, Modifier } from '@popperjs/core';
import { useClickAway } from 'react-use';

export type PopoverPlacement = Exclude<Placement, ''>
export type PopoverStrategy = 'absolute' | 'fixed'

export interface BasePopoverProps {
  /**
   * Whether this popover show content.
   */
  active: boolean
  /**
   * Callback invoked when user click out of component while Popover is active
   */
  onClickAway?: () => void
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
   * If true, the content views is created and attached to the DOM when the popover is opened(active) for the first time,
   * otherwise this happens when the component mounts.
   *
   * Lazy mounting provides noticeable performance improvements
   * if you have lots of Popover which have tons of complex elements in content view at once, such as on each cell of a table.
   * @default false
   */
  lazy?: boolean
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

  /**
   * state for lazy render content portal views.
   */
  const [neverOpened, setNeverOpened] = useState(true)
  useEffect(() => {
    if (props.lazy && props.active && neverOpened) {
      setNeverOpened(false)
    }
  }, [props.lazy, props.active])

  const popoverRef = useRef<any>(null)
  useClickAway(popoverRef, () => {
    if (props.active) {
      props.onClickAway && props.onClickAway()
    }
  })

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

  const activator = useMemo(() => {
    return <Activator ref={setReferenceElement}>{props.activator}</Activator>
  }, [props.activator, setReferenceElement])

  const content = useMemo(() => {
    if (props.lazy && neverOpened) return null

    return finalProps.usePortal ? ReactDOM.createPortal((
      <Portal>
        <Content ref={setPopperElement} style={{...styles.popper}} {...attributes.popper}>{props.children}</Content>
      </Portal>
    ), finalProps.portalContainer) : (
      <Content ref={setPopperElement} style={{...styles.popper}} {...attributes.popper}>{props.children}</Content>
    )
  }, [
    props.lazy, neverOpened,
    finalProps.usePortal, props.children,
    styles, attributes, setPopperElement,
  ])

  return (
    <Root ref={popoverRef}>
      {activator}
      {content}
    </Root>
  )
})

export type PopoverProps = Parameters<typeof Popover>[0]
