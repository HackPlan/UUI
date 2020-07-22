import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { LayoutContentProps, LayoutContent } from './LayoutContent';
import { LayoutBottomBarProps, LayoutBottomBar } from './LayoutBottomBar';
import { LayoutTopBarProps, LayoutTopBar } from './LayoutTopBar';
import { LayoutSiderProps, LayoutSider } from './LayoutSider';
import classNames from 'classnames';

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
      'HasSider': !!sider,
      'HasTopBar': !!header,
      'HasBottomBar': !!footer,
    })}>
      {props.children}
    </Root>
  )
})

export type LayoutProps = Parameters<typeof _Layout>[0]


const Layout = _Layout as typeof _Layout & {
  Sider: typeof LayoutSider;
  TopBar: typeof LayoutTopBar;
  BottomBar: typeof LayoutBottomBar;
  Content: typeof LayoutContent;
}

Layout.Sider = LayoutSider;
Layout.TopBar = LayoutTopBar;
Layout.BottomBar = LayoutBottomBar;
Layout.Content = LayoutContent;

export { Layout }
