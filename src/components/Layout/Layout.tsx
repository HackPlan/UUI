import React, { useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { LayoutMainProps, LayoutMain } from './LayoutMain';
import { LayoutFooterProps, LayoutFooter } from './LayoutFooter';
import { LayoutHeaderProps, LayoutHeader } from './LayoutHeader';
import { LayoutNavProps, LayoutNav } from './LayoutNav';
import { createGroupedComponent } from '../../utils/createGroupedComponent';
import { LayoutAside, LayoutAsideProps } from './LayoutAside';

export interface LayoutFeatureProps {
  /**
   * The content of tag.
   */
  children?:
    (
      | React.ReactElement<LayoutHeaderProps>
      | React.ReactElement<LayoutMainProps>
      | React.ReactElement<LayoutFooterProps>
      | React.ReactElement<LayoutNavProps>
      | React.ReactElement<LayoutAsideProps>
    )[];
}

export const _Layout = UUIFunctionComponent({
  name: 'Layout',
  nodes: {
    Root: 'section',
  },
}, (props: LayoutFeatureProps, { nodes, NodeDataProps }) => {
  const { Root } = nodes

  const { nav, header, footer } = useMemo(() => {
    return {
      nav: props.children && props.children.find((i: any) => i.type === LayoutNav) as React.ReactElement<LayoutNavProps> | undefined,
      header: props.children && props.children.find((i: any) => i.type === LayoutHeader) as React.ReactElement<LayoutHeaderProps> | undefined,
      footer: props.children && props.children.find((i: any) => i.type === LayoutFooter) as React.ReactElement<LayoutFooterProps> | undefined,
    }
  }, [props.children])

  return (
    <Root
      {...NodeDataProps({
        'has-nav': !!nav,
        'has-header': !!header,
        'has-footer': !!footer,
      })}
    >
      {props.children}
    </Root>
  )
})

export type LayoutProps = UUIFunctionComponentProps<typeof _Layout>

const Layout = createGroupedComponent(_Layout, {
  Nav: LayoutNav,
  Header: LayoutHeader,
  Main: LayoutMain,
  Footer: LayoutFooter,
  Aside: LayoutAside,
})

export { Layout }
