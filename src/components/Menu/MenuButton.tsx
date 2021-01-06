import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Button as UUIButton, ButtonFeatureProps } from '../Button';
import { pick } from 'lodash-es';

export interface MenuButtonFeatureProps extends Pick<
  ButtonFeatureProps, 'children' | 'onClick' | 'loading' | 'disabled'
> {}

export const MenuButton = UUIFunctionComponent({
  name: 'MenuButton',
  nodes: {
    Root: 'div',
    Button: UUIButton,
  }
}, (props: MenuButtonFeatureProps, nodes) => {
  const { Root, Button } = nodes

  return (
    <Root role="menuitem">
      <Button {...pick(props, 'onClick', 'loading', 'disabled')}>
        {props.children}
      </Button>
    </Root>
  )
})

export type MenuButtonProps = UUIFunctionComponentProps<typeof MenuButton>

