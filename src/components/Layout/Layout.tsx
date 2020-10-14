import React, { useMemo } from 'react';
import { UUI } from '../../core/uui';
import { LayoutMainProps, LayoutMain } from './LayoutMain';
import { LayoutFooterProps, LayoutFooter } from './LayoutFooter';
import { LayoutHeaderProps, LayoutHeader } from './LayoutHeader';
import { LayoutNavProps, LayoutNav } from './LayoutNav';
import classNames from 'classnames';
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

export const _Layout = UUI.FunctionComponent({
  name: 'Layout',
  nodes: {
    Root: 'section',
  },
}, (props: LayoutFeatureProps, nodes) => {
  const { Root } = nodes

  const { nav, header, footer } = useMemo(() => {
    return {
      nav: props.children && props.children.find((i: any) => i.type === LayoutNav) as React.ReactElement<LayoutNavProps> | undefined,
      header: props.children && props.children.find((i: any) => i.type === LayoutHeader) as React.ReactElement<LayoutHeaderProps> | undefined,
      footer: props.children && props.children.find((i: any) => i.type === LayoutFooter) as React.ReactElement<LayoutFooterProps> | undefined,
    }
  }, [props.children])

  return (
    <Root className={classNames({
      'STATE_hasNav': !!nav,
      'STATE_hasHeader': !!header,
      'STATE_hasFooter': !!footer,
    })}>
      {props.children}
    </Root>
  )
})

export type LayoutProps = Parameters<typeof _Layout>[0]

const Layout = createGroupedComponent(_Layout, {
  Nav: LayoutNav,
  Header: LayoutHeader,
  Main: LayoutMain,
  Footer: LayoutFooter,
  Aside: LayoutAside,
})

export { Layout }
