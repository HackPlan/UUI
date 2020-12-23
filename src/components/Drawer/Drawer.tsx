import React, { useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { useLockBodyScroll } from 'react-use';
import ReactHelper from '../../utils/ReactHelper';
import { KeyCode } from '../../utils/keyboardHelper';
import FocusTrap from 'focus-trap-react';
import { useGlobalClickAway } from '../../hooks/useGlobalClickAway';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerFeatureProps {
    /**
   * Whether this Drawer show content.
   */
  active: boolean;
  /**
   * Callback invoked when user click outside of content view.
   */
  onClickAway?: () => void;
  /**
   * Callback invoked when user close Drawer
   */
  onClose?: () => void;
  /**
   * The content elements of Drawer
   */
  children: React.ReactNode;
  /**
   * Whether the content of Drawer should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
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
   * Whether lock scrolling on the body element while Drawer is active
   * @default true
   */
  lockBodyScroll?: boolean;
  /**
   * Whether lock focus on the backdrop element while Drawer is active
   * @default true
   */
  focusTrap?: boolean;
  /**
   * The position at which the Drawer should appear.
   * @default right
   */
  placement?: DrawerPlacement;
}

export const Drawer = UUIFunctionComponent({
  name: 'Drawer',
  nodes: {
    Root: 'div',
    Portal: 'div',
    Backdrop: 'div',
    Content: 'div',
  }
}, (props: DrawerFeatureProps, { nodes, NodeDataProps }) => {
  const { Root, Portal, Backdrop, Content } = nodes

  /**
   * handle optional props default value
   */
  const finalProps = {
    usePortal: props.usePortal === undefined ? true : props.usePortal,
    portalContainer: props.portalContainer || ReactHelper.document?.body,
    lockBodyScroll: props.lockBodyScroll === undefined ? true : props.lockBodyScroll,
    focusTrap: props.focusTrap === undefined ? true : props.focusTrap,
    placement: props.placement || 'right',
  }

  const contentRef = useRef<any>(null)

  useGlobalClickAway(props.active, contentRef, props.onClickAway)

  useLockBodyScroll(props.active && finalProps.lockBodyScroll)

  const restoreElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (props.active) {
      restoreElement.current = document.activeElement as HTMLElement
    } else {
      restoreElement.current?.focus()
      restoreElement.current = null
    }
  }, [props.active])

  const content = useMemo(() => {
    return (
      <FocusTrap active={props.active && finalProps.focusTrap}>
        <Backdrop
          {...NodeDataProps({
            'active': !!props.active,
            'placement': finalProps.placement,
          })}
        >
          <Content
            role="dialog"
            aria-modal={props.active}
            ref={contentRef}
            tabIndex={0}
            onKeyDown={(event) => {
              switch (event.keyCode) {
                case KeyCode.Escape:
                  if (props.active) {
                    props.onClose && props.onClose()
                  }
                  break
                default:
                  // do nothing
              }
            }}
          >{props.children}</Content>
        </Backdrop>
      </FocusTrap>
    )
  }, [props, finalProps.focusTrap, finalProps.placement, NodeDataProps])

  const portal = useMemo(() => {
    return (finalProps.usePortal && finalProps.portalContainer)
    ? ReactDOM.createPortal(<Portal>{content}</Portal>, finalProps.portalContainer)
    : <Portal>{content}</Portal>
  }, [finalProps.usePortal, finalProps.portalContainer, content])

  return (
    <Root role="dialog">
      {portal}
    </Root>
  )
})

export type DrawerProps = UUIFunctionComponentProps<typeof Drawer>
