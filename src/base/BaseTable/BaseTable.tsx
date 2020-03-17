import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

import './BaseTable.scss';
import { BaseCheckbox } from '../BaseCheckbox';
import { range, omit } from 'lodash';

export enum BaseTableNodeName {
  BaseTable = "table",
  Root = "root",
  Head = "head",
  Body = "body",
  Row = "row",
  HeadCell = "headcell",
  DataCell = "datacell",
}

export type BaseTableCell = React.ReactNode | string
export interface BaseTableColumn {
  title: BaseTableCell
  children?: BaseTableColumn[]
}

export interface BaseTableProps extends React.HTMLAttributes<HTMLTableElement>, StylishProps<BaseTableNodeName> {
  columns: BaseTableColumn[]
  rows: BaseTableCell[][]

  selectedIndexes?: number[]
  onSelected?: (indexes: number[]) => void

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

  const groupColumns = useMemo(() => {
    const groupCells: (BaseTableColumn & { colspan?: number; rowspan?: number; })[][] = []
    let maxDepth = 0;
    const dfs = (column: BaseTableColumn, depth: number): { colspan: number; rowspan: number; } => {
      let colspan = 0, rowspan = 0;
      maxDepth = Math.max(maxDepth, depth);
      if (column.children) {
        for (const child of column.children) {
          const result = dfs(child, depth+1)
          colspan += result.colspan
          rowspan = result.rowspan
        }
      } else {
        colspan += 1
        rowspan = depth
      }
      if (!groupCells[depth-1]) groupCells[depth-1] = []
      groupCells[depth-1].push({ ...column, colspan, rowspan })
      return { colspan, rowspan }
    }
    for (const column of props.columns) {
      dfs(column, 1)
    }
    return groupCells.map((cells) => cells.map((cell) => {
      cell.colspan = cell.colspan == 1 ? undefined : cell.colspan
      cell.rowspan = maxDepth - (cell.rowspan || 1) + 1
      cell.rowspan = cell.rowspan == 1 ? undefined : cell.rowspan
      return cell
    }))
  }, [props.columns])

  return (
    <Root
      {...omit(props, 'columns', 'rows', 'selectedIndexes', 'onSelected')}
      className={"u-border u-border-black u-py-1 u-px-2"}
    >
      <Head>
        {/* Selection Head Cell */}
        {props.selectedIndexes && (
          <Row>
            <HeadCell rowSpan={9999}>
              <BaseCheckbox
                value={props.selectedIndexes.length === props.rows.length}
                onChange={(value) => {
                  props.onSelected && props.onSelected(value ? range(0, props.rows.length) : [])
                }}
              />
            </HeadCell>
          </Row>
        )}

        {/* Grouping Head Cells */}
        {groupColumns.map((row, rowIndex) => (
          <Row key={`column-row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <HeadCell
                key={`column-row${rowIndex}-cell-${cellIndex}`}
                colSpan={cell.colspan}
                rowSpan={cell.rowspan}
              >
                {cell.title}
              </HeadCell>
            ))}
          </Row>
        ))}
      </Head>
      <Body>
        {props.rows.map((row, index) => {
          return (
            <Row key={`row-${index}`}>

              {/* Selection Head Cell */}
              {props.selectedIndexes && (
                <DataCell>
                  <BaseCheckbox
                    value={props.selectedIndexes.includes(index)}
                    onChange={(value) => {
                      const indexesSet = new Set(props.selectedIndexes)
                      if (value)  indexesSet.add(index)
                      else        indexesSet.delete(index)
                      props.onSelected && props.onSelected(Array.from(indexesSet))
                    }}
                  />
                </DataCell>
              )}

              {/* Data Cell */}
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