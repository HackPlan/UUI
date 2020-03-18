import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';

import './Table.scss';
import { Checkbox } from '../Checkbox';
import { range, omit } from 'lodash';

export enum TableNodeName {
  Table = "table",
  Root = "root",
  Head = "head",
  Body = "body",
  Row = "row",
  HeadCell = "headcell",
  DataCell = "datacell",
}

export type TableCell = React.ReactNode | string
export interface TableColumn {
  title: TableCell
  children?: TableColumn[]
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement>, StylishProps<TableNodeName> {
  columns: TableColumn[]
  rows: TableCell[][]

  selectedIndexes?: number[]
  onSelected?: (indexes: number[]) => void

  hideHeader?: boolean
  emptyView?: React.ReactNode
}

export function Table(props: TableProps) {

  // Initial Nodes
  const [
    Root,
    Head,
    Body,
    Row,
    HeadCell,
    DataCell,
  ] = useMemo(() => {
    const stylished = initStylished(TableNodeName.Table, props, { prefix: "uui" })
    return [
      stylished.element('table', TableNodeName.Root),
      stylished.element('thead', TableNodeName.Head),
      stylished.element('tbody', TableNodeName.Body),
      stylished.element('tr', TableNodeName.Row),
      stylished.element('th', TableNodeName.HeadCell),
      stylished.element('td', TableNodeName.DataCell),
    ]
  }, [])

  const groupColumns = useMemo(() => {
    const groupCells: (TableColumn & { colspan?: number; rowspan?: number; })[][] = []
    let maxDepth = 0;
    const dfs = (column: TableColumn, depth: number): { colspan: number; rowspan: number; } => {
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
      {...omit(props,
        'columns', 'rows',
        'selectedIndexes', 'onSelected',
        'hideHeader', 'emptyView',
      )}
      className={"u-border u-border-black u-py-1 u-px-2"}
    >
      {!props.hideHeader && (
        <Head>
          {/* Selection Head Cell */}
          {props.selectedIndexes && (
            <Row>
              <HeadCell rowSpan={9999}>
                <Checkbox
                  value={props.selectedIndexes.length === props.rows.length && props.rows.length > 0}
                  onChange={(value) => {
                    if (props.rows.length > 0) {
                      props.onSelected && props.onSelected(value ? range(0, props.rows.length) : [])
                    }
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
      )}

      <Body>
        {props.rows.length === 0 ? (
          <Row>
            <DataCell colSpan={9999}>
              {props.emptyView || (
                <div className="u-h-40 u-flex u-items-center u-justify-center">No Data</div>
              )}
            </DataCell>
          </Row>
        ) : props.rows.map((row, index) => {
          return (
            <Row key={`row-${index}`}>

              {/* Selection Head Cell */}
              {props.selectedIndexes && (
                <DataCell>
                  <Checkbox
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