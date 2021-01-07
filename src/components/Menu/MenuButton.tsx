import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Button as UUIButton, ButtonFeatureProps } from '../Button';
import { pick } from 'lodash-es';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface MenuButtonFeatureProps extends Pick<
  ButtonFeatureProps, 'children' | 'onClick' | 'loading' | 'disabled'
> {
  disabled?: ButtonFeatureProps['disabled'];
  onClick?: ButtonFeatureProps['onClick'];
}

export const MenuButtonPropTypes = createComponentPropTypes<MenuButtonFeatureProps>({
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  loading: PropTypes.bool,
})

export const MenuButton = UUIFunctionComponent({
  name: 'MenuButton',
  nodes: {
    Root: 'div',
    Button: UUIButton,
  },
  propTypes: MenuButtonPropTypes,
}, (props: MenuButtonFeatureProps, { nodes }) => {
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

