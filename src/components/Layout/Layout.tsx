import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { LayoutContentProps, LayoutContent } from './LayoutContent';
import { LayoutBottomBarProps, LayoutBottomBar } from './LayoutBottomBar';
import { LayoutTopBarProps, LayoutTopBar } from './LayoutTopBar';
import { LayoutSiderProps, LayoutSider } from './LayoutSider';
import classNames from 'classnames';
import { createGroupedComponent } from '../../utils/createGroupedComponent';

export interface LayoutFeatureProps {
  /**
   * The content of tag.
   */
  children?:
    (
      | React.ReactElement<LayoutTopBarProps>
      | React.ReactElement<LayoutContentProps>
      | React.ReactElement<LayoutBottomBarProps>
      | React.ReactElement<LayoutSiderProps>
    )[];
}

export const _Layout = UUI.FunctionComponent({
  name: 'Layout',
  nodes: {
    Root: 'section',
  },
}, (props: LayoutFeatureProps, nodes) => {
  const { Root } = nodes

  const { sider, header, footer } = useMemo(() => {
    return {
      sider: props.children && props.children.find((i: any) => i.type === LayoutSider) as React.ReactElement<LayoutSiderProps> | undefined,
      header: props.children && props.children.find((i: any) => i.type === LayoutTopBar) as React.ReactElement<LayoutTopBarProps> | undefined,
      footer: props.children && props.children.find((i: any) => i.type === LayoutBottomBar) as React.ReactElement<LayoutBottomBarProps> | undefined,
    }
  }, [props.children])

  return (
    <Root className={classNames({
      'STATE_hasSider': !!sider,
      'STATE_hasTopBar': !!header,
      'STATE_hasBottomBar': !!footer,
    })}>
      {props.children}
    </Root>
  )
})

export type LayoutProps = Parameters<typeof _Layout>[0]

const Layout = createGroupedComponent(_Layout, {
  Sider: LayoutSider,
  TopBar: LayoutTopBar,
  BottomBar: LayoutBottomBar,
  Content: LayoutContent,
})

export { Layout }
