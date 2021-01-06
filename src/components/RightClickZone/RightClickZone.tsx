import React, { useRef, useState, useMemo, useImperativeHandle, useCallback } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { usePopper } from 'react-popper';
import { Placement, Modifier } from '@popperjs/core';
import classNames from 'classnames';
import { useGlobalClickAway } from '../../hooks/useGlobalClickAway';
import ReactHelper from '../../utils/ReactHelper';
import ReactDOM from 'react-dom';

export type RightClickZonePlacement = Exclude<Placement, ''>
export type RightClickZoneStrategy = 'absolute' | 'fixed'

export interface RightClickZoneFeatureProps {
  contextMenu: React.ReactNode;
  children: React.ReactNode;
  /**
   * Whether the ContextMenu of RightClickZone should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
   * @default false
   */
  usePortal?: boolean;
  /**
   * The container element into which the overlay renders its contents, when `usePortal` is `true`.
   * This prop is ignored if `usePortal` is `false`.
   * @default document.body
   */
  portalContainer?: HTMLElement;
  /**
   * The position (relative to the activator) at which the ContextMenu of RightClickZone should appear.
   * @default 'bottom'
   */
  placement?: RightClickZonePlacement;
  /**
   * The position strategy
   * @default absolute
   */
  strategy?: RightClickZoneStrategy;
  /**
   * Popper.js props. reference: https://popper.js.org/docs/v2/modifiers/
   */
  modifiers?: ReadonlyArray<Modifier<any, object>>;
  referenceElement?: Element;
  popperElement?: Element;
}

export const RightClickZone = UUIFunctionComponent({
  name: 'RightClickZone',
  nodes: {
    Root: 'div',
    Origin: 'div',
    Portal: 'div',
    ContextMenu: 'div',
  }
}, (props: RightClickZoneFeatureProps, nodes, ref) => {
  const { Root, Origin, ContextMenu, Portal } = nodes

  const rootRef = useRef<any | null>(null)
  const referenceRef = useRef<any | null>(null)
  const popperRef = useRef<any | null>(null)

  const openMenu = useCallback((position?: { x: number; y: number }) => {
    setActive(true)
    if (position) setOriginPosition(position)
  }, [])

  const closeMenu = useCallback(() => {
    setActive(false)
    setOriginPosition({ x: 0, y: 0 })
  }, [])

  useImperativeHandle(ref, () => {
    return {
      openMenu: openMenu,
      closeMenu: closeMenu
    }
  })

  /**
   * handle optional props default value
   */
  const finalProps = {
    usePortal: props.usePortal === undefined ? false : props.usePortal,
    portalContainer: props.portalContainer || ReactHelper.document?.body,
    placement: props.placement || 'auto-start',
    strategy: props.strategy || 'absolute',
    modifiers: [
      ...(props.modifiers || []),
    ]
  }

  const [active, setActive] = useState(false)

  const [originPosition, setOriginPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const { styles, attributes, update: updatePopper } = usePopper(referenceRef.current, popperRef.current, {
    placement: finalProps.placement,
    strategy: finalProps.strategy,
    modifiers: finalProps.modifiers,
  });

  useGlobalClickAway(active, popperRef, () => {
    const paths: string[] | undefined = (event as any)['path']
    const activitorClick = paths?.some((i) => i === rootRef.current)
    if (activitorClick) return;
    if (active) {
      closeMenu()
    }
  })

  const contextMenu = useMemo(() => {
    /**
     * Popover enable lazy feature, and this is never opened, content will not rendered.
     */
    if (!active) return null

    const content = <ContextMenu
      className={classNames({
        'active': active,
      })}
      ref={popperRef}
      style={{...styles.popper}}
      {...attributes.popper}
      onContextMenu={(event) => { event.stopPropagation() }}
    >
      {props.contextMenu}
    </ContextMenu>

    return (finalProps.usePortal && finalProps.portalContainer)
      ? ReactDOM.createPortal((
        <Portal>
          {content}
        </Portal>
      ), finalProps.portalContainer)
      : content
  }, [active, styles.popper, attributes.popper, props.contextMenu, finalProps.usePortal, finalProps.portalContainer])

  return (
    <Root
      ref={rootRef}
      onContextMenu={(event) => {
        event.preventDefault()
        event.stopPropagation()
        const pos = {
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        }
        setImmediate(() => {
          openMenu(pos)
          updatePopper && updatePopper()
        })
      }}
    >
      <Origin ref={referenceRef} style={{ top: originPosition.y, left: originPosition.x }} />
      {props.children}
      {contextMenu}
    </Root>
  )
})

export type RightClickZoneProps = UUIFunctionComponentProps<typeof RightClickZone>