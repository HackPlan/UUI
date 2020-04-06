import React, { useMemo, useCallback } from 'react';
import { range, omit } from 'lodash';
import { DragDropContext, Droppable, Draggable, DragStart, DropResult } from 'react-beautiful-dnd';

import { UUI } from '../../utils/uui';
import { Checkbox as UUICheckbox } from '../Checkbox';
import './Table.scss';

export interface TableColumn {
  title: React.ReactNode
  children?: TableColumn[]
}

export interface BaseTableProps {
  columns: TableColumn[]
  rows: React.ReactNode[][]

  /**
   * Indicate which rows are selected, if this props passed,
   * table will show a selection column in first of all.
   */
  selectedIndexes?: number[]
  /**
   * Callback of selection, it will trigger when user select or unselect some row.
   */
  onSelected?: (indexes: number[]) => void

  /**
   * Table will hide header if this props set true
   */
  hideHeader?: boolean
  /**
   * Customize table empty view.
   */
  emptyView?: React.ReactNode

  /**
   * Callback of drag and drop, if 
   */
  onDragged?: (fromIndex: number, toIndex: number) => void
}

export const Table = UUI.FunctionComponent({
  name: 'Table',
  nodes: {
    Root: 'table',
    Head: 'thead',
    Body: 'tbody',
    Row: 'tr',
    HeadCell: 'th',
    DataCell: 'td',
    Checkbox: UUICheckbox,
  }
}, (props: BaseTableProps, nodes) => {
  const { Root, Head, Body, Row, HeadCell, DataCell, Checkbox } = nodes

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

  /**
   * Drag and Drop
   */
  const onBeforeDragStart = useCallback((initial: DragStart) => {
    const elements = Array.from(document.getElementsByTagName('td'))
    for (const element of elements) {
      element.setAttribute('UUI_TABLE_FIXED_WIDTH', 'yes')
      element.setAttribute('UUI_TABLE_FIXED_HEIGHT', 'yes')
      element.style.width = `${element.offsetWidth}px`
      element.style.height = `${element.offsetHeight}px`
    }
  }, [])
  const onDragEnd = useCallback((result: DropResult) => {
    props.onDragged && result.destination && props.onDragged(result.source.index, result.destination.index)

    const elements = Array.from(document.getElementsByTagName('td'))
    for (const element of elements) {
      if (element.getAttribute('UUI_TABLE_FIXED_WIDTH')) {
        element.style.width = 'undefined'
        element.removeAttribute('UUI_TABLE_FIXED_WIDTH')
      }
      if (element.getAttribute('UUI_TABLE_FIXED_HEIGHT')) {
        element.style.height = 'undefined'
        element.removeAttribute('UUI_TABLE_FIXED_HEIGHT')
      }
    }
  }, [])

  return (
    <Root
      {...omit(props,
        'columns', 'rows',
        'selectedIndexes', 'onSelected',
        'hideHeader', 'emptyView',
        'onDragged',
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

      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragEnd={onDragEnd}
      >
      <Droppable droppableId="RowDroppable" type="ROW">
        {(provided, snapshot) => (
          <Body ref={provided.innerRef} {...provided.droppableProps}>
            {props.rows.length === 0 ? (
              <Row>
                <DataCell colSpan={9999}>
                  {props.emptyView || (
                    <div className="u-h-40 u-flex u-items-center u-justify-center">No Data</div>
                  )}
                </DataCell>
              </Row>
            ) : props.rows.map((row, rowIndex) => {
              const draggableId = `RowDraggable-${rowIndex}`
              return (
                <Draggable
                  key={`row-${rowIndex}`}
                  draggableId={draggableId}
                  index={rowIndex}
                  isDragDisabled={!props.onDragged}
                >
                  {(provided, snapshot) => {
                    const draggableStyle = provided.draggableProps.style;
                    const transform = draggableStyle ? draggableStyle.transform : null;

                    return (
                      <Row ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          ...(transform && {
                            transform: `translate(0, ${transform.substring(
                              transform.indexOf(',') + 1,
                              transform.indexOf(')'),
                            )})`,
                          }),
                          width: 1000,
                        }}
                      >

                      {/* Selection Head Cell */}
                      {props.selectedIndexes && (
                        <DataCell>
                          <Checkbox
                            value={props.selectedIndexes.indexOf(rowIndex) !== -1}
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
                  }}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </Body>
        )}
      </Droppable>
      </DragDropContext>
    </Root>
  )
})

export type TableProps = Parameters<typeof Table>[0]