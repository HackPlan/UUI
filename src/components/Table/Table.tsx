import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { useArrayCacheRender } from '../../hooks/useCacheRender';
import { Checkbox as UUICheckbox } from '../Checkbox';
import { LoadingCover } from '../Loading';

export interface TableColumn<T> {
  key: string;
  title: React.ReactNode;
  children?: TableColumn<T>[];
  onRowRender?: (row: T) => React.ReactNode;
}

export interface TableFeatureProps<T> {
  /**
   * Columns information of table
   * @default []
   */
  columns: TableColumn<T>[];
  /**
   * data source of table
   * @default []
   */
  rows: T[];
  onRowId: (row: T) => string;

  /**
   * Whether the table is loading.
   * @default false
   */
  loading?: boolean;

  /**
   * Indicate which rows are selected,
   * if this prop is provided, table will show a selection column in the first.
   * @default none
   */
  selectedRowIds?: string[];
  /**
   * Callback invoked when one row of table is selected.
   * Recommended when `selectedIndexes` is passed.
   * @default none
   */
  onSelected?: (ids: string[]) => void;

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

  /**
   * Whether cache rendering row.
   */
  cacheRowRender?: boolean;
  /**
   * Whether the current row has changed and needs to be updated.
   */
  cacheRowComparator?: (prev: T, next: T) => boolean;
}

export const TableNodes = {
  Root: 'div',
  LoadingCover: LoadingCover,
  Table: 'table',
  Head: 'thead',
  Body: 'tbody',
  Row: 'tr',
  HeadCell: 'th',
  DataCell: 'td',
  Checkbox: UUICheckbox,
  EmptyView: 'div',
} as const

export const Table = UUIFunctionComponent({
  name: 'Table',
  nodes: TableNodes,
}, (props: TableFeatureProps<any>, nodes) => {
  const { Root, LoadingCover, Table, Head, Body, Row, HeadCell, DataCell, Checkbox, EmptyView } = nodes

  const { selectedRowIds, onSelected, rows, onRowId } = props

  /**
   * UUI Table support multiple-level grouping columns.
   * `props.columns` is a tree data structure,
   * use Depth-first search (DFS) to generate flatted data that rendering needs.
   */
  const { groupColumns, dataColumns } = useMemo(() => {
    const groupCells: (TableColumn<any> & { colspan?: number; rowspan?: number })[][] = []
    const dataColumns: TableColumn<any>[] = [];
    let maxDepth = 0;
    const dfs = (column: TableColumn<any>, depth: number): { colspan: number; rowspan: number } => {
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
        dataColumns.push(column)
      }
      if (!groupCells[depth-1]) groupCells[depth-1] = []
      groupCells[depth-1].push({ ...column, colspan, rowspan })
      return { colspan, rowspan }
    }
    for (const column of props.columns) {
      dfs(column, 1)
    }
    const groupColumns = groupCells.map((cells) => cells.map((cell) => {
      cell.colspan = cell.colspan == 1 ? undefined : cell.colspan
      cell.rowspan = maxDepth - (cell.rowspan || 1) + 1
      cell.rowspan = cell.rowspan == 1 ? undefined : cell.rowspan
      return cell
    }))

    return { groupColumns, dataColumns }
  }, [props.columns])

  /**
   * head cells
   */
  const headCells = groupColumns.map((row, rowIndex) => {
    const rowKey = `row:head${rowIndex}`
    const rowClassName = `ROW_head`
    const selectionCellKey = `${rowKey}-column:selection`
    const selectionCellClassName = 'COLUMN_selection'
    return (
      <Row role="row" className={classNames([rowClassName])} key={rowKey}>
        {/* Selection Head Cell */}
        {selectedRowIds && rowIndex === 0 && (
          <HeadCell role="columnheader" key={selectionCellKey} className={classNames([selectionCellClassName])} rowSpan={9999}>
            <Checkbox
              checked={selectedRowIds.length === rows.length && rows.length > 0}
              onChange={(value) => {
                if (rows.length > 0) {
                  onSelected && onSelected(value ? rows.map(onRowId) : [])
                }
              }}
            />
          </HeadCell>
        )}
        {row.map((cell) => {
          const cellKey = `${rowKey}-column:${cell.key}`
          const cellKeyClassName = `COLUMN_${cell.key}`
          return (
            <HeadCell
              role="columnheader"
              key={cellKey}
              className={classNames([cellKeyClassName])}
              colSpan={cell.colspan}
              rowSpan={cell.rowspan}
            >
              {cell.title}
            </HeadCell>
          )
        })}
      </Row>
    )
  })

  /**
   * data cells rendering function
   */
  const renderDataCells = useCallback((row: any) => {
    const rowId = onRowId(row)
    const rowKey = `row:${rowId}`
    const rowKeyClassName = `ROW_${rowId}`
    const selectionCellKey = `${rowKey}-column:selection`
    const selectionCellClassName = 'COLUMN_selection'
    return (
      <Row role="row" key={rowKey} className={classNames([rowKeyClassName])}>

      {/* Selection Head Cell */}
      {selectedRowIds && (
        <DataCell role="cell" key={selectionCellKey} className={classNames([selectionCellClassName])}>
          <Checkbox
            checked={selectedRowIds.includes(rowId)}
            onChange={(value) => {
              const selectedRowIdsSet = new Set(selectedRowIds)
              if (value)  selectedRowIdsSet.add(rowId)
              else        selectedRowIdsSet.delete(rowId)
              onSelected && onSelected(Array.from(selectedRowIdsSet))
            }}
          />
        </DataCell>
      )}

      {/* Data Cell */}
      {dataColumns.map((column) => {
        const columnKey = column.key
        const cellKey = `${rowKey}-column:${columnKey}`
        const cellKeyClassName = `COLUMN_${columnKey}`
        const onRowRender = column.onRowRender || ((row: any) => {
          return row[column.key] || null
        })
        return (
          <DataCell role="cell" key={cellKey} className={classNames([cellKeyClassName])}>{onRowRender(row)}</DataCell>
        )
      })}

      </Row>
    )
  }, [dataColumns, onRowId, selectedRowIds, onSelected])

  /**
   * data cells
   * cache rendering by row if props.cacheRowRender is true.
   */
  const dataCells = props.cacheRowRender
    // cache render
    ? useArrayCacheRender(props.rows, renderDataCells, {
      id: (row) => props.onRowId(row),
      comparator: props.cacheRowComparator,
    })
    // render every time
    : props.rows.map(renderDataCells)

  return (
    <Root
      role="table"
      className={classNames({
        'STATE_loading': props.loading,
        'STATE_empty': props.rows.length === 0,
      })}
    >
      <LoadingCover loading={props.loading}>
        <Table role="table">
          {!props.hideHeader && (
            <Head role="rowgroup">
              {/* Grouping Head Cells */}
              {headCells}
            </Head>
          )}
          <Body role="rowgroup">
            {props.rows.length === 0 ? (
              <Row role="row">
                <DataCell colSpan={9999}>
                  <EmptyView>
                    {props.emptyView || 'No Data'}
                  </EmptyView>
                </DataCell>
              </Row>
            ) : dataCells}
          </Body>
        </Table>
      </LoadingCover>
    </Root>
  )
})

export type TableProps = UUIFunctionComponentProps<typeof Table>