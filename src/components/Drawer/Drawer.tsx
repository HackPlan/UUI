import React from 'react';
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylishHelper';
import { useFocusTrap, useLockBodyScroll } from '../../hooks'

import './Drawer.scss'

export enum DrawerNodeName {
  Root = "drawer",
  Container = "container",
  Content = "content",
}

export interface DrawerProps extends ExtraClassNameProps<DrawerNodeName>, ExtraStyleProps<DrawerNodeName> {
  open: boolean,
  focusTrap?: boolean,
  lockBodyScroll?: boolean,
  children?: React.ReactNode | string
  onClick?: () => void
}

export function Drawer(props: DrawerProps) {
  const getStylishProps = initStylish<DrawerNodeName>(DrawerNodeName.Root, props, { prefix: "uui" })
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
        role="drawer"
        {...getStylishProps(DrawerNodeName.Container, ['u-bg-white u-rounded u-p-4'])}
      >
        <div
          {...getStylishProps(DrawerNodeName.Content)}
        >{props.children}</div>
      </div>
    </div>
  )
}