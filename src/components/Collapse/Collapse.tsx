import React from 'react';
import { UUI } from '../../core/uui';
import classNames from 'classnames';

export interface CollapseFeatureProps {
  opened: boolean;
  children: React.ReactNode;
}

export const Collapse = UUI.FunctionComponent({
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

export type CollapseProps = Parameters<typeof Collapse>[0]
