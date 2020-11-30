import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import ReactHelper from '../../utils/ReactHelper';
import classNames from 'classnames';

export interface BreadcrumbItem {
  key: string;
  active?: boolean;
  label: React.ReactNode;
  path?: string;
  onAction?: () => void;
}

export interface BreadcrumbFeatureProps {
  separator?: React.ReactNode;
  items: BreadcrumbItem[];
}

export const Breadcrumb = UUIFunctionComponent({
  name: 'Breadcrumb',
  nodes: {
    Root: 'nav',
    List: 'ol',
    Item: 'li',
    Separator: 'li',
    ItemLink: 'a',
  }
}, (props: BreadcrumbFeatureProps, nodes) => {
  const { Root, List, Item, ItemLink, Separator } = nodes

  const finalProps = {
    separator: props.separator || '/'
  }

  return (
    <Root
      aria-label={"Breadcrumb"}
    >
      <List>
        {ReactHelper.join(props.items.map((i) => {
          const interactive = !!i.path || !!i.onAction
          return (
            <Item
              tabIndex={0}
              key={i.key}
              className={classNames({
                'STATE_active': i.active,
                'STATE_interactive': interactive,
              })}
              onClick={() => {
                if (i.onAction) i.onAction()
              }}
            >
              {!!i.path && !i.onAction ? (
                <ItemLink href={i.path} tabIndex={-1}>{i.label}</ItemLink>
              ) : i.label}
            </Item>
          )
        }), <Separator>{finalProps.separator}</Separator>)}
      </List>
    </Root>
  )
})

export type BreadcrumbProps = UUIFunctionComponentProps<typeof Breadcrumb>
