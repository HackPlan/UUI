import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

import './BaseTable.scss';

export enum BaseTableNodeName {
  BaseTable = "table",
  Root = "root",
  Head = "head",
  Body = "body",
  Row = "row",
  HeadCell = "headcell",
  DataCell = "datacell",
}

export interface BaseTableProps extends React.HTMLAttributes<HTMLTableElement>, StylishProps<BaseTableNodeName> {
  columns: (React.ReactNode | string)[]
  rows: (React.ReactNode | string)[][]

  hideHeader?: boolean
}

export function BaseTable(props: BaseTableProps) {

  // Initial Nodes
  const [
    Root,
    Head,
    Body,
    Row,
    HeadCell,
    DataCell,

  ] = useMemo(() => {
    const stylished = initStylished(BaseTableNodeName.BaseTable, props, { prefix: "uui" })
    return [
      stylished.element('table', BaseTableNodeName.Root),
      stylished.element('thead', BaseTableNodeName.Head),
      stylished.element('tbody', BaseTableNodeName.Body),
      stylished.element('tr', BaseTableNodeName.Row),
      stylished.element('th', BaseTableNodeName.HeadCell),
      stylished.element('td', BaseTableNodeName.DataCell),
    ]
  }, [])

  return (
    <Root {...props} className={"u-border u-border-black u-py-1 u-px-2"}>
      <Head>
        <Row>
          {props.columns.map((column, index) => {
            return (<HeadCell key={`column-${index}`}>{column}</HeadCell>)
          })}
        </Row>
      </Head>
      <Body>
        {props.rows.map((row, index) => {
          return (
            <Row key={`row-${index}`}>
              {row.map((cell, index) => {
                return (
                  <DataCell key={`cell-${index}`}>{cell}</DataCell>
                )
              })}
            </Row>
          )
        })}
      </Body>
    </Root>
  )
}