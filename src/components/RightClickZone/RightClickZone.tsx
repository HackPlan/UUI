import React, { useRef, useState } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { usePopper } from 'react-popper';
import { VirtualElement, Placement, Modifier } from '@popperjs/core';
import classNames from 'classnames';
import { useGlobalClickAway } from '../../hooks/useGlobalClickAway';

export type RightClickZonePlacement = Exclude<Placement, ''>
export type RightClickZoneStrategy = 'absolute' | 'fixed'

export interface RightClickZoneFeatureProps {
  contextMenu: React.ReactNode;
  children: React.ReactNode;
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
    ContextMenu: 'div',
  }
}, (props: RightClickZoneFeatureProps, nodes) => {
  const { Root, ContextMenu } = nodes

  /**
   * handle optional props default value
   */
  const finalProps = {
    placement: props.placement || 'auto-start',
    strategy: props.strategy || 'absolute',
    modifiers: [
      { name: 'offset', options: { offset: [4, 4] } },
      ...(props.modifiers || []),
    ]
  }

  const [active, setActive] = useState(false)

  const [virtualReference, setVirtualReference] = useState<VirtualElement | null>(null)
  const rootRef = useRef<any | null>(null)
  const popperRef = useRef<any | null>(null)

  const { styles, attributes, update: updatePopper } = usePopper(virtualReference, popperRef.current, {
    placement: finalProps.placement,
    strategy: finalProps.strategy,
    modifiers: finalProps.modifiers,
  });

  useGlobalClickAway(active, popperRef, () => {
    const paths: string[] | undefined = (event as any)['path']
    const activitorClick = paths?.some((i) => i === rootRef.current)
    if (activitorClick) return;
    if (active) {
      setActive(false)
    }
  })

  return (
    <Root
      ref={rootRef}
      onContextMenu={(event) => {
        event.preventDefault()
        event.stopPropagation()
        const clientX = event.clientX
        const clientY = event.clientY
        setImmediate(() => {
          setActive(true)
          setVirtualReference({
            getBoundingClientRect: () => {
              return {
                width: 0,
                height: 0,
                top: clientY,
                right: clientX,
                bottom: clientY,
                left: clientX,
              }
            }
          })
          updatePopper && updatePopper()
        })
      }}
    >
      {props.children}
      <ContextMenu
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
    </Root>
  )
})

export type RightClickZoneProps = UUIFunctionComponentProps<typeof RightClickZone>