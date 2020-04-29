import React, { useRef } from 'react';
import { useFocusTrap, useLockBodyScroll } from '../../hooks'

import classNames from 'classnames';
import { UUI } from '../../utils/uui';
import { useClickAway } from 'react-use';

export interface BaseDialogProps {
  /**
   * Toggles the visibility of the overlay and its children.
   * This prop is required because the component is controlled.
   */
  open: boolean;
  /**
   * Callback invoked when user click outside of content view.
   */
  onDismiss?: () => void;
  focusTrap?: boolean;
  /**
   * Wether lock scrolling on the body element while Drawer is active
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
}, (props: BaseDialogProps, nodes) => {
  const { Root, Backdrop, Container, Content } = nodes

  useLockBodyScroll(props.open && !!props.lockBodyScroll)

  const containerRef = useRef<any>(null)
  useClickAway(containerRef, () => {
    props.open && props.onDismiss && props.onDismiss()
  })

  const ref = useFocusTrap(props.open && !!props.focusTrap)
  return (
    <Root>
      <Backdrop
        ref={ref}
        className={classNames({
          'opened': props.open
        })}
        role="presentation"
        tabIndex={-1}
      >
        <Container
          ref={containerRef}
          role="dialog"
          className={classNames({
            'opened': props.open
          })}
        >
          <Content>{props.children}</Content>
        </Container>
      </Backdrop>
    </Root>
  )
})

export type DialogProps = Parameters<typeof Dialog>[0]