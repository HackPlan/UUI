import React, { useRef } from 'react';
import useFocusTrap from '@charlietango/use-focus-trap';

import classNames from 'classnames';
import { UUI } from '../../core/uui';
import { useClickAway, useLockBodyScroll } from 'react-use';
import ReactDOM from 'react-dom';

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
    Backdrop: 'div',
    Container: 'div',
    Content: 'div',
  }
}, (props: DialogFeatureProps, nodes) => {
  const { Root, Backdrop, Container, Content } = nodes

  /**
   * handle optional props default value
   */
  const finalProps = {
    usePortal: props.usePortal === undefined ? true : props.usePortal,
    portalContainer: props.portalContainer || document.body,
    lockBodyScroll: props.lockBodyScroll === undefined ? true : props.lockBodyScroll,
  }

  useLockBodyScroll(props.open && !!finalProps.lockBodyScroll)

  const containerRef = useRef<any>(null)
  useClickAway(containerRef, () => {
    props.open && props.onClickAway && props.onClickAway()
  })

  const ref = useFocusTrap(props.open && !!props.focusTrap)

  const backdrop = (
    <Backdrop
      ref={ref}
      className={classNames({
        'STATE_opened': props.open
      })}
      role="presentation"
      tabIndex={-1}
    >
      <Container
        ref={containerRef}
        role="dialog"
        className={classNames({
          'STATE_opened': props.open
        })}
      >
        <Content>{props.children}</Content>
      </Container>
    </Backdrop>
  )
  const portal = finalProps.usePortal ? ReactDOM.createPortal(backdrop, finalProps.portalContainer) : backdrop
  return (
    <Root role="dialog">
      {portal}
    </Root>
  )
})

export type DialogProps = Parameters<typeof Dialog>[0]