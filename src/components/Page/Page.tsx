import React from 'react'
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylishHelper'
import './Page.scss'
import { PageAnnotatedSection } from './AnnotatedSection'
import { PageHeader } from './Header'
import { PageSection } from './Section'

export enum PageNodeName {
  Root = "page",
  Header = "header",
}

export interface PageProps extends ExtraClassNameProps<PageNodeName>, ExtraStyleProps<PageNodeName> {
  children?: React.ReactNode
}

function Page(props: PageProps) {
  const getStylishProps = initStylish<PageNodeName>(PageNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', [])}>
      {props.children}
    </div>
  )
}

Page.AnnotatedSection = PageAnnotatedSection
Page.Section = PageSection

Page.Header = PageHeader
export { Page };