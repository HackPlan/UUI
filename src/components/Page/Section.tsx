import React from 'react'
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylishHelper'

export enum PageSectionNodeName {
  Root = "page-section",
}

export interface PageSectionProps extends ExtraClassNameProps<PageSectionNodeName>, ExtraStyleProps<PageSectionNodeName> {
  children?: React.ReactNode
}

export function PageSection(props: PageSectionProps) {
  const getStylishProps = initStylish<PageSectionNodeName>(PageSectionNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', ['u-p-4'])}>
      {props.children}
    </div>
  )
}