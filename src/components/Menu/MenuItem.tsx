import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface MenuItemFeatureProps {
  children: React.ReactNode;
}

export const MenuItemPropTypes = createComponentPropTypes<MenuItemFeatureProps>({
  children: PropTypes.node.isRequired,
})

export const MenuItem = UUIFunctionComponent({
  name: 'MenuItem',
  nodes: {
    Root: 'div',
  },
  propTypes: MenuItemPropTypes,
}, (props: MenuItemFeatureProps, { nodes }) => {
  const { Root } = nodes

  return (
    <Root role="menuitem">
      {props.children}
    </Root>
  )
})

export type MenuItemProps = UUIFunctionComponentProps<typeof MenuItem>

