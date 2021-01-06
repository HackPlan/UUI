import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Checkbox as UUICheckbox, CheckboxFeatureProps } from '../Checkbox';
import { pick } from 'lodash-es';

export interface MenuButtonFeatureProps extends Pick<
  CheckboxFeatureProps, 'checked' | 'name' | 'label' | 'onChange' | 'disabled'
> {}

export const MenuButton = UUIFunctionComponent({
  name: 'MenuButton',
  nodes: {
    Root: 'div',
    Checkbox: UUICheckbox,
  }
}, (props: MenuButtonFeatureProps, nodes) => {
  const { Root, Checkbox } = nodes

  return (
    <Root role="menuitem">
      <Checkbox {...pick(props, 'checked', 'name', 'label', 'onChange', 'disabled')} />
    </Root>
  )
})

export type MenuButtonProps = UUIFunctionComponentProps<typeof MenuButton>

