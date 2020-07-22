import React from 'react';
import { UUI } from '../../core/uui';
import { ReactHelper } from '../../utils/ReactHelper';
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

export const Breadcrumb = UUI.FunctionComponent({
  name: 'Breadcrumb',
  nodes: {
    Root: 'div',
    Item: 'div',
    ItemLink: 'a',
    Separator: 'div',
  }
}, (props: BreadcrumbFeatureProps, nodes) => {
  const { Root, Item, ItemLink, Separator } = nodes

  const finalProps = {
    separator: props.separator || '/'
  }

  return (
    <Root>
      {ReactHelper.join(props.items.map((i) => {
        const interactive = !!i.path || !!i.onAction
        return (
          <Item key={i.key} className={classNames({
            'STATE_active': i.active,
            'STATE_interactive': interactive,
          })} onClick={() => {
            if (i.onAction) i.onAction()
          }}>
            {!!i.path && !i.onAction ? (
              <ItemLink href={i.path}>{i.label}</ItemLink>
            ) : i.label}
          </Item>
        )
      }), <Separator>{finalProps.separator}</Separator>)}
    </Root>
  )
})

export type BreadcrumbProps = Parameters<typeof Breadcrumb>[0]
