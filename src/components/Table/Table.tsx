import React, { useMemo } from 'react';
import { range } from 'lodash';
import { UUI } from '../../core/uui';
import { Checkbox as UUICheckbox } from '../Checkbox';
import classNames from 'classnames';
import { LoadingCover } from '../Loading';

export interface TableColumn<T> {
  key: string;
  title: React.ReactNode;
  children?: TableColumn<T>[];
  onRowRender: (row: T) => React.ReactNode;
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

export const Table = UUI.FunctionComponent({
  name: 'Table',
  nodes: TableNodes,
}, (props: TableFeatureProps<any>, nodes) => {
  const { Root, LoadingCover, Table, Head, Body, Row, HeadCell, DataCell, Checkbox, EmptyView } = nodes

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

  console.log(dataColumns)

  return (
    <Root
      className={classNames({
        'STATE_loading': props.loading,
        'STATE_empty': props.rows.length === 0,
      })}
    >
      <LoadingCover loading={props.loading}>
        <Table>
          {!props.hideHeader && (
            <Head>
              {/* Grouping Head Cells */}
              {groupColumns.map((row, rowIndex) => {
                const rowKey = `row:head${rowIndex}`
                const rowClassName = `ROW_head`
                const selectionCellKey = `${rowKey}-column:selection`
                const selectionCellClassName = 'COLUMN_selection'
                return (
                  <Row className={classNames([rowClassName])} key={rowKey}>
                    {/* Selection Head Cell */}
                    {props.selectedRowIds && rowIndex === 0 && (
                      <HeadCell key={selectionCellKey} className={classNames([selectionCellClassName])} rowSpan={9999}>
                        <Checkbox
                          checked={props.selectedRowIds.length === props.rows.length && props.rows.length > 0}
                          onChange={(value) => {
                            if (props.rows.length > 0) {
                              props.onSelected && props.onSelected(value ? props.rows.map(props.onRowId) : [])
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
              })}
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
            ) : props.rows.map((row) => {
              const rowId = props.onRowId(row)
              const rowKey = `row:${rowId}`
              const rowKeyClassName = `ROW_${rowId}`
              const selectionCellKey = `${rowKey}-column:selection`
              const selectionCellClassName = 'COLUMN_selection'
              return (
                <Row key={rowKey} className={classNames([rowKeyClassName])}>

                {/* Selection Head Cell */}
                {props.selectedRowIds && (
                  <DataCell key={selectionCellKey} className={classNames([selectionCellClassName])}>
                    <Checkbox
                      checked={props.selectedRowIds.includes(rowId)}
                      onChange={(value) => {
                        const selectedRowIdsSet = new Set(props.selectedRowIds)
                        if (value)  selectedRowIdsSet.add(rowId)
                        else        selectedRowIdsSet.delete(rowId)
                        props.onSelected && props.onSelected(Array.from(selectedRowIdsSet))
                      }}
                    />
                  </DataCell>
                )}

                {/* Data Cell */}
                {dataColumns.map((column) => {
                  const columnKey = column.key
                  const cellKey = `${rowKey}-column:${columnKey}`
                  const cellKeyClassName = `COLUMN_${columnKey}`
                  return (
                    <DataCell key={cellKey} className={classNames([cellKeyClassName])}>{column.onRowRender(row)}</DataCell>
                  )
                })}

                </Row>
              )
            })}
          </Body>
        </Table>
      </LoadingCover>
    </Root>
  )
})

export type TableProps = Parameters<typeof Table>[0]