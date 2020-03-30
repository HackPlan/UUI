import React from 'react';
import { useFocusTrap, useLockBodyScroll } from '../../hooks'

import './Dialog.scss'
import classNames from 'classnames';
import { UUI } from '../../utils/uui';

export interface BaseDialogProps {
  open: boolean,
  focusTrap?: boolean,
  lockBodyScroll?: boolean,
  children?: React.ReactNode | string
  onClick?: () => void
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
  const ref = useFocusTrap(props.open && !!props.focusTrap)
  return (
    <Root>
      <Backdrop
        ref={ref}
        className={classNames({
          'is-visible': props.open
        })}
        role="presentation"
        tabIndex={-1}
      >
        <Container
          role="dialog"
          className={classNames(['u-bg-white u-rounded u-p-4'], {
            'is-visible': props.open
          })}
        >
          <Content>{props.children}</Content>
        </Container>
      </Backdrop>
    </Root>
  )
})

export type DialogProps = Parameters<typeof Dialog>[0]