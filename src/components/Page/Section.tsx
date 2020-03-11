import React from 'react'
import { StylishProps, initStylish } from '../../utils/stylish'

export enum PageSectionNodeName {
  Root = "page-section",
}

export interface PageSectionProps extends StylishProps<PageSectionNodeName> {
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