import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface MenuItemFeatureProps {
  children: React.ReactNode;
}

export const MenuItem = UUIFunctionComponent({
  name: 'MenuItem',
  nodes: {
    Root: 'div',
  }
}, (props: MenuItemFeatureProps, nodes) => {
  const { Root } = nodes

  return (
    <Root role="menuitem">
      {props.children}
    </Root>
  )
})

export type MenuItemProps = UUIFunctionComponentProps<typeof MenuItem>

