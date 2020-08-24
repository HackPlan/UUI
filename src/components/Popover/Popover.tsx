import { Modifier, Placement } from '@popperjs/core';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper-2';
import { useClickAway } from 'react-use';
import { UUI } from '../../core/uui';
import ReactHelper from '../../utils/ReactHelper';

export type PopoverPlacement = Exclude<Placement, ''>
export type PopoverStrategy = 'absolute' | 'fixed'

export interface PopoverFeatureProps {
  /**
   * Whether this popover show content.
   */
  active: boolean;
  /**
   * Callback invoked when user click out of component while Popover is active
   */
  onClickAway?: () => void;
  /**
   * The trigger elements of Popover.
   * The position of content depends on activator.
   */
  activator: React.ReactNode;
  /**
   * The content elements of Popover
   */
  children: React.ReactNode;
  /**
   * Whether the content of popover should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
   * @default true
   */
  usePortal?: boolean;
  /**
   * The container element into which the overlay renders its contents, when `usePortal` is `true`.
   * This prop is ignored if `usePortal` is `false`.
   * @default document.body
   */
  portalContainer?: HTMLElement;
  /**
   * If true, the content views is created and attached to the DOM when the popover is opened(active) for the first time,
   * otherwise this happens when the component mounts.
   *
   * Lazy mounting provides noticeable performance improvements
   * if you have lots of Popover which have tons of complex elements in content view at once, such as on each cell of a table.
   * @default false
   */
  lazy?: boolean;
  /**
   * The position (relative to the activator) at which the popover should appear.
   * @default 'bottom'
   */
  placement?: PopoverPlacement;
  /**
   * The position strategy
   * @default absolute
   */
  strategy?: PopoverStrategy;
  /**
   * Popper.js props. reference: https://popper.js.org/docs/v2/modifiers/
   */
  modifiers?: ReadonlyArray<Modifier<any, object>>;
}

export const Popover = UUI.FunctionComponent({
  name: 'Popover',
  nodes: {
    Root: 'div',
    Activator: 'div',
    Portal: 'div',
    Content: 'div',
  },
}, (props: PopoverFeatureProps, nodes) => {
  const { Root, Activator, Portal, Content } = nodes

  /**
   * handle optional props default value
   */
  const finalProps = {
    usePortal: props.usePortal === undefined ? true : props.usePortal,
    portalContainer: props.portalContainer || ReactHelper.document?.body,
    placement: props.placement || 'bottom',
    strategy: props.strategy || 'absolute',
    modifiers: [
      { name: 'offset', options: { offset: [0, 4] } },
      ...(props.modifiers || []),
    ]
  }

  /**
   * state for lazy render content portal views.
   * `neverOpened` initial state true, when props.active becomes true,
   * it will be turned to false and never turn back.
   */
  const [neverOpened, setNeverOpened] = useState(true)
  useEffect(() => {
    if (props.lazy && props.active && neverOpened) {
      setNeverOpened(false)
    }
  // intentionally Ignore `neverOpened` dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lazy, props.active])

  /**
   * handle onClickAway callback
   */
  const popperRef = useRef<any>(null)
  useClickAway(popperRef, () => {
    if (props.active) {
      props.onClickAway && props.onClickAway()
    }
  })

  const [referenceElement, setReferenceElement] = React.useState<any>(null);
  const [popperElement, setPopperElement] = React.useState<any>(null);
  const { styles, attributes, update: updatePopper } = usePopper(referenceElement, popperElement, {
    placement: finalProps.placement,
    strategy: finalProps.strategy,
    modifiers: finalProps.modifiers,
  });

  useEffect(() => {
    if (updatePopper) {
      updatePopper()
    }
  }, [props.active, updatePopper])

  const activator = useMemo(() => {
    return <Activator ref={setReferenceElement}>{props.activator}</Activator>
  }, [props.activator, setReferenceElement])

  const content = useMemo(() => {
    /**
     * Popover enable lazy feature, and this is never opened, content will not rendered.
     */
    if (props.lazy && neverOpened) return null

    return (finalProps.usePortal && finalProps.portalContainer)
      ? ReactDOM.createPortal((
        <Portal>
          <Content
            className={classNames({ 'STATE_active': props.active })}
            ref={(ref) => { setPopperElement(ref); popperRef.current = ref; }}
            style={{...styles.popper}} {...attributes.popper}
          >{props.children}</Content>
        </Portal>
      ), finalProps.portalContainer)
      : (
        <Content
          className={classNames({ 'STATE_active': props.active })}
          ref={(ref) => { setPopperElement(ref); popperRef.current = ref; }}
          style={{...styles.popper}} {...attributes.popper}
        >{props.children}</Content>
      )
  }, [
    props.lazy, props.active, finalProps.portalContainer, neverOpened,
    finalProps.usePortal, props.children,
    styles, attributes, setPopperElement,
  ])

  return (
    <Root className={classNames({ 'STATE_active': props.active })}>
      {activator}
      {content}
    </Root>
  )
})

export type PopoverProps = Parameters<typeof Popover>[0]
