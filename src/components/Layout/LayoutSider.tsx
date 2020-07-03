import React from 'react';
import { UUI } from '../../core/uui';

export interface BaseLayoutSiderProps {
  /**
   * The container of LayoutSider.
   */
  children?: React.ReactNode;
}

export const LayoutSider = UUI.FunctionComponent({
  name: 'LayoutSider',
  nodes: {
    Root: 'div',
  },
}, (props: BaseLayoutSiderProps, nodes) => {
  const { Root } = nodes

  return (
    <Root>
      {props.children}
    </Root>
  )
})

export type LayoutSiderProps = Parameters<typeof LayoutSider>[0]