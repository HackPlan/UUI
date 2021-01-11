import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { MenuItem } from './MenuItem';
import { MenuButton } from './MenuButton';
import { MenuSeparator } from './MenuSeparator';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface MenuFeatureProps {
  children: React.ReactNode;
}

export const MenuPropTypes = createComponentPropTypes<MenuFeatureProps>({
  children: PropTypes.node.isRequired,
})

export const _Menu = UUIFunctionComponent({
  name: 'Menu',
  nodes: {
    Root: 'div'
  },
  propTypes: MenuPropTypes,
}, (props: MenuFeatureProps, { nodes }) => {
  const { Root } = nodes

  return (
      <Root role="menu">
        {props.children}
      </Root>
  )
})

export type MenuProps = UUIFunctionComponentProps<typeof _Menu>

const Menu = createGroupedComponent(_Menu, {
  Item: MenuItem,
  Button: MenuButton,
  Separator: MenuSeparator,
})

export { Menu }
