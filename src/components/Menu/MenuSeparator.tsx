import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';

export interface MenuSeparatorFeatureProps {}

export const MenuSeparator = UUIFunctionComponent({
  name: 'MenuSeparator',
  nodes: {
    Root: 'div',
  }
}, (props: MenuSeparatorFeatureProps, { nodes }) => {
  const { Root } = nodes

  return (
    <Root role="separator"></Root>
  )
})

export type MenuSeparatorProps = UUIFunctionComponentProps<typeof MenuSeparator>

