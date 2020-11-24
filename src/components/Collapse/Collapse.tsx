import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import classNames from 'classnames';

export interface CollapseFeatureProps {
  opened: boolean;
  children: React.ReactNode;
}

export const Collapse = UUIFunctionComponent({
  name: 'Collapse',
  nodes: {
    Root: 'div',
  },
}, (props: CollapseFeatureProps, nodes) => {
  const { Root } = nodes

  return (
    <Root className={classNames({
      'STATE_opened': props.opened
    })}>
      {props.children}
    </Root>
  )
})

export type CollapseProps = UUIFunctionComponentProps<typeof Collapse>
