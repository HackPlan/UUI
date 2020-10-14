import React, { useRef, useMemo, useEffect } from 'react';
import useFocusTrap from '@charlietango/use-focus-trap';

import classNames from 'classnames';
import { UUI } from '../../core/uui';
import { useClickAway, useLockBodyScroll } from 'react-use';
import ReactDOM from 'react-dom';
import ReactHelper from '../../utils/ReactHelper';
import { KeyCode } from '../../utils/keyboardHelper';

export interface DialogFeatureProps {
  /**
   * Toggles the visibility of the overlay and its children.
   * This prop is required because the component is controlled.
   */
  open: boolean;
  /**
   * Callback invoked when user click outside of content view.
   */
  onClickAway?: () => void;
  /**
   * Callback invoked when user close dialog
   */
  onClose?: () => void;
  /**
   * Whether lock focus on the backdrop element while Dialog is active
   * @default true
   */
  focusTrap?: boolean;
  /**
   * Whether the content of Dialog should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
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
   * Whether lock scrolling on the body element while Dialog is active
   */
  lockBodyScroll?: boolean;
  /**
   * The content of this dialog
   */
  children?: React.ReactNode | string;
}

export const Dialog = UUI.FunctionComponent({
  name: 'Dialog',
  nodes: {
    Root: 'div',
    Portal: 'div',
    Backdrop: 'div',
    Container: 'div',
    Content: 'div',
  }
}, (props: DialogFeatureProps, nodes) => {
  const { Root, Portal, Backdrop, Container, Content } = nodes

  /**
   * handle optional props default value
   */
  const finalProps = {
    usePortal: props.usePortal === undefined ? true : props.usePortal,
    portalContainer: props.portalContainer || ReactHelper.document?.body,
    lockBodyScroll: props.lockBodyScroll === undefined ? true : props.lockBodyScroll,
    focusTrap: props.focusTrap === undefined ? true : props.focusTrap
  }

  useLockBodyScroll(props.open && !!finalProps.lockBodyScroll)

  const containerRef = useRef<any>(null)
  useClickAway(containerRef, () => {
    if (props.open) {
      props.onClickAway && props.onClickAway()
    }
  })

  const restoreElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (props.open) {
      restoreElement.current = document.activeElement as HTMLElement
    } else {
      restoreElement.current?.focus()
      restoreElement.current = null
    }
  }, [props.open])

  const backdropRef = useFocusTrap(props.open && finalProps.focusTrap)

  const backdrop = (
    <Backdrop
      ref={backdropRef}
      role="dialog"
      aria-modal={props.open}
      className={classNames({
        'STATE_opened': props.open
      })}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Escape:
            if (props.open) {
              props.onClose && props.onClose()
            }
            break
          default:
            // do nothing
        }
      }}
    >
      <Container
        ref={containerRef}
        className={classNames({
          'STATE_opened': props.open
        })}
      >
        <Content>{props.children}</Content>
      </Container>
    </Backdrop>
  )
  const wrappedBackdrop = useMemo(() => {
    return (finalProps.usePortal && finalProps.portalContainer)
    ? ReactDOM.createPortal(<Portal>{backdrop}</Portal>, finalProps.portalContainer)
    : <Portal>{backdrop}</Portal>
  }, [backdrop, finalProps.portalContainer, finalProps.usePortal]);
  return (
    <Root>
      {wrappedBackdrop}
    </Root>
  )
})

export type DialogProps = Parameters<typeof Dialog>[0]