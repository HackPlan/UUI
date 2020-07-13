import React, { useMemo } from 'react';
import { range, omit } from 'lodash';
import { UUI } from '../../core/uui';
import { Checkbox as UUICheckbox } from '../Checkbox';
import classNames from 'classnames';

export interface TableColumn {
  title: React.ReactNode;
  children?: TableColumn[];
}

export interface BaseTableProps {
  /**
   * Columns information of table
   * @default []
   */
  columns: TableColumn[];
  /**
   * Cells of table
   * @default []
   */
  rows: React.ReactNode[][];

  /**
   * Indicate which rows are selected,
   * if this prop is provided, table will show a selection column in the first.
   * @default none
   */
  selectedIndexes?: number[];
  /**
   * Callback invoked when one row of table is selected.
   * Recommended when `selectedIndexes` is passed.
   * @default none
   */
  onSelected?: (indexes: number[]) => void;

  /**
   * Whether this table should hide header.
   * @default false
   */
  hideHeader?: boolean;
  /**
   * Customize table empty view.
   * @default none
   */
  emptyView?: React.ReactNode;
}

export const TableNodes = {
  Root: 'table',
  Head: 'thead',
  Body: 'tbody',
  Row: 'tr',
  HeadCell: 'th',
  DataCell: 'td',
  Checkbox: UUICheckbox,
  EmptyView: 'div',
} as const

export const Table = UUI.FunctionComponent({
  name: 'Table',
  nodes: TableNodes,
}, (props: BaseTableProps, nodes) => {
  const { Root, Head, Body, Row, HeadCell, DataCell, Checkbox, EmptyView } = nodes

  const groupColumns = useMemo(() => {
    const groupCells: (TableColumn & { colspan?: number; rowspan?: number })[][] = []
    let maxDepth = 0;
    const dfs = (column: TableColumn, depth: number): { colspan: number; rowspan: number } => {
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
        'onDragged',
      )}
    >
      {!props.hideHeader && (
        <Head>
          {/* Grouping Head Cells */}
          {groupColumns.map((row, rowIndex) => (
            <Row key={`column-row-${rowIndex}`}>
              {/* Selection Head Cell */}
              {props.selectedIndexes && rowIndex === 0 && (
                <HeadCell className={classNames('selection')} rowSpan={9999}>
                  <Checkbox
                    checked={props.selectedIndexes.length === props.rows.length && props.rows.length > 0}
                    onChange={(value) => {
                      if (props.rows.length > 0) {
                        props.onSelected && props.onSelected(value ? range(0, props.rows.length) : [])
                      }
                    }}
                  />
                </HeadCell>
              )}
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
              <EmptyView>
                {props.emptyView || 'No Data'}
              </EmptyView>
            </DataCell>
          </Row>
        ) : props.rows.map((row, rowIndex) => {
          return (
            <Row key={rowIndex}>

            {/* Selection Head Cell */}
            {props.selectedIndexes && (
              <DataCell className={classNames('selection')}>
                <Checkbox
                  checked={props.selectedIndexes.indexOf(rowIndex) !== -1}
                  onChange={(value) => {
                    const indexesSet = new Set(props.selectedIndexes)
                    if (value)  indexesSet.add(rowIndex)
                    else        indexesSet.delete(rowIndex)
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
})

export type TableProps = Parameters<typeof Table>[0]