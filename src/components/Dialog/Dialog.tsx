import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { useFocusTrap, useLockBodyScroll } from '../../hooks'

import './Dialog.scss'
import classNames from 'classnames';

export enum DialogNodeName {
  Dialog = "dialog",
  Root = "root",
  Backdrop = "backdrop",
  Container = "container",
  Content = "content",
}

export interface DialogProps extends StylishProps<DialogNodeName> {
  open: boolean,
  focusTrap?: boolean,
  lockBodyScroll?: boolean,
  children?: React.ReactNode | string
  onClick?: () => void
}

export function Dialog(props: DialogProps) {

  // Initial Nodes
  const [
    Root,
    Backdrop,
    Container,
    Content,
  ] = useMemo(() => {
    const stylished = initStylished(DialogNodeName.Dialog, props, { prefix: "uui" })
    return [
      stylished.element('div', DialogNodeName.Root),
      stylished.element('div', DialogNodeName.Backdrop),
      stylished.element('div', DialogNodeName.Container),
      stylished.element('div', DialogNodeName.Content),
    ]
  }, [])

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
}