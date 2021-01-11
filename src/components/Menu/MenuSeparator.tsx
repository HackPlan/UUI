import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes } from '../../utils/createPropTypes';

export interface MenuSeparatorFeatureProps {}

export const MenuSeparatorPropTypes = createComponentPropTypes<MenuSeparatorFeatureProps>({})

export const MenuSeparator = UUIFunctionComponent({
  name: 'MenuSeparator',
  nodes: {
    Root: 'div',
  },
  propTypes: MenuSeparatorPropTypes,
}, (props: MenuSeparatorFeatureProps, { nodes }) => {
  const { Root } = nodes

  return (
    <Root role="separator"></Root>
  )
})

export type MenuSeparatorProps = UUIFunctionComponentProps<typeof MenuSeparator>

