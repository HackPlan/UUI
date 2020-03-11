import React from 'react'
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylish'

export enum PageAnnotatedSectionNodeName {
  Root = "page-annotated-section",
  Header = "header",
  Title = "title",
  Description = "description",
  Content = "content",
}

export interface PageAnnotatedSectionProps extends ExtraClassNameProps<PageAnnotatedSectionNodeName>, ExtraStyleProps<PageAnnotatedSectionNodeName> {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  children?: React.ReactNode
}

export function PageAnnotatedSection(props: PageAnnotatedSectionProps) {
  const getStylishProps = initStylish<PageAnnotatedSectionNodeName>(PageAnnotatedSectionNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', [
      'u-p-4 u-flex u-flex-row u-justify-between'
    ])}>
      <div {...getStylishProps(PageAnnotatedSectionNodeName.Header, [])}>
        <div {...getStylishProps(PageAnnotatedSectionNodeName.Title, [])}>{props.title}</div>
        <div {...getStylishProps(PageAnnotatedSectionNodeName.Description, [])}>{props.description}</div>
      </div>
      <div {...getStylishProps(PageAnnotatedSectionNodeName.Content, [])}>
        {props.children}
      </div>
    </div>
  )
}