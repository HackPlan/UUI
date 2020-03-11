import React from 'react'
import { StylishProps, initStylish } from '../../utils/stylish'

export enum PageHeaderNodeName {
  Root = "page-annotated-header",
  Navigation = "navigation",
  Subject = "subject",
  Title = "title",
  SubTitle = "sub-title",
  PrimaryAction = "primary-action",
}

export interface PageHeaderProps extends StylishProps<PageHeaderNodeName> {
  title?: string | React.ReactNode
  subTitle?: string | React.ReactNode
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
  children?: React.ReactNode
}

export function PageHeader(props: PageHeaderProps) {
  const getStylishProps = initStylish<PageHeaderNodeName>(PageHeaderNodeName.Root, props, { prefix: "uui" })
  return (
    <div {...getStylishProps('', ['u-flex u-flex-col u-p-4'])}>
      <div {...getStylishProps(PageHeaderNodeName.Navigation, ['u-flex u-flex-row'])}>
        {"<"} navigation {/* TODO: icon, back button */}
      </div>
      <div {...getStylishProps(PageHeaderNodeName.Subject, ['u-flex u-flex-row u-justify-between u-content-center u-items-center'])}>
        <div>
          <img src="" alt=""/>
          <div>
            <h3 {...getStylishProps(PageHeaderNodeName.Title, ['u-flex u-flex-col u-text-2xl u-font-bold'])}>{props.title}</h3>
            <h4 {...getStylishProps(PageHeaderNodeName.SubTitle, ['u-flex u-flex-col'])}>{props.subTitle}</h4>
          </div>
        </div>
        <div {...getStylishProps(PageHeaderNodeName.PrimaryAction, [])}>
          {props.primaryAction}
        </div>
      </div>
      <div className="u-flex u-flex-row">
        {props.secondaryAction}
      </div>
      {props.children}
    </div>
  )
}