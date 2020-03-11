import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylish';
import { useFocusTrap, useLockBodyScroll } from '../../hooks'

import './Dialog.scss'

export enum DialogNodeName {
  Root = "dialog",
  Container = "container",
  Content = "content",
}

export interface DialogProps extends ExtraClassNameProps<DialogNodeName>, ExtraStyleProps<DialogNodeName> {
  open: boolean,
  focusTrap?: boolean,
  lockBodyScroll?: boolean,
  children?: React.ReactNode | string
  onClick?: () => void
}

export function Dialog(props: DialogProps) {
  const getStylishProps = initStylish<DialogNodeName>(DialogNodeName.Root, props, { prefix: "uui" })
  useLockBodyScroll(props.open && !!props.lockBodyScroll)
  const ref = useFocusTrap(props.open && !!props.focusTrap)
  return (
    <div
      ref={ref}
      {...getStylishProps('', [
        props.open ? 'is-visible' : '',
      ])}
      role="presentation"
      tabIndex={-1}
    >
      <div
        role="dialog"
        {...getStylishProps(DialogNodeName.Container, ['u-bg-white u-rounded u-p-4'])}
      >
        <div
          {...getStylishProps(DialogNodeName.Content)}
        >{props.children}</div>
      </div>
    </div>
  )
}