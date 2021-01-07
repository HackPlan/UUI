import React, { useState, useRef, useCallback } from 'react';
import { KeyCode } from '../../utils/keyboardHelper';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export interface ListBoxItem {
  disabled?: boolean;
  id: string;
  content: React.ReactNode;
}
export interface ListBoxFeatureProps {
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
  items: ListBoxItem[];
  disabled?: boolean;
  multiple?: boolean;
  selectedIds?: string[];
  onSelected?: (ids: string[]) => void;
  onSelect?: (id: string) => void;
  onUnselect?: (id: string) => void;
}

export const ListBoxItemPropTypes = createComponentPropTypes<ListBoxItem>({
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
})
export const ListBoxPropTypes = createComponentPropTypes<ListBoxFeatureProps>({
  loading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape(ListBoxItemPropTypes)).isRequired,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  onSelected: PropTypes.func,
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
})

export const ListBox = UUIFunctionComponent({
  name: 'ListBox',
  nodes: {
    Root: 'div',
    Box: 'ul',
    Item: 'li',
  },
  propTypes: ListBoxPropTypes,
}, (props: ListBoxFeatureProps, { nodes, NodeDataProps, options }) => {
  const { Root, Box, Item } = nodes

  const [focusedId, setFocusedId] = useState<string | null>(null)

  const listRef = useRef<HTMLUListElement | null>(null)

  const getNextFocusItem = useCallback((action: 'next' | 'prev' | 'first' | 'last') => {
    const direction = (action === 'first' || action === 'next') ? 1 : -1
    let targetIndex = (() => {
      if (action === 'first' || action === 'last' || focusedId === null) {
        switch (action) {
          case 'next': case 'first': return 0;
          case 'prev': case 'last': return props.items.length - 1
        }
      } else {
        return props.items.findIndex((i) => i.id === focusedId) + direction
      }
    })()
    if (targetIndex === -1) return

    for (; targetIndex < props.items.length && targetIndex >= 0; targetIndex = targetIndex + direction) {
      const targetItem = props.items[targetIndex]
      if (targetItem && !targetItem.disabled) {
        return targetItem
      }
    }
  }, [focusedId, props])

  const focusItem = useCallback((item: ListBoxItem) => {
    setFocusedId(item.id)
  }, [])

  const scrollToFocusedItem = useCallback(() => {
    if (listRef.current) {
      const focusedItem = listRef.current.querySelector(`.UUI-ListBox-Item[data-${options.prefix.toLowerCase()}-focused="true"]`) as HTMLLIElement | null
      if (focusedItem) {
        focusedItem.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        })
      }
    }
  }, [options.prefix])

  const selectItem = useCallback((item: ListBoxItem) => {
    if (props.multiple) {
      const idsSet = new Set(props.selectedIds)
      if (idsSet.has(item.id)) {
        idsSet.delete(item.id)
        props.onUnselect && props.onUnselect(item.id)
      } else {
        idsSet.add(item.id)
        props.onSelect && props.onSelect(item.id)
      }
      const newSelectedIds = Array.from(idsSet)
      props.onSelected && props.onSelected(newSelectedIds)
    } else {
      props.onSelected && props.onSelected([item.id])
    }
  }, [props])

  return (
    <Root
      {...NodeDataProps({
        'disabled': !!props.disabled,
      })}
    >
      <Box
        ref={listRef}
        role="listbox"
        aria-disabled={!!props.disabled}
        tabIndex={props.disabled ? -1 : 0}
        onKeyDown={(event) => {
          switch (event.keyCode) {
            case KeyCode.Enter:
            case KeyCode.SpaceBar:
              event.preventDefault()
              if (focusedId !== null) {
                const item = props.items.find((i) => i.id === focusedId)
                if (item) selectItem(item)
              }
              break
            case KeyCode.ArrowDown: {
              event.preventDefault()
              const item = getNextFocusItem('next')
              if (item) focusItem(item)
              setTimeout(() => scrollToFocusedItem(), 0)
              break
            }
            case KeyCode.ArrowUp: {
              event.preventDefault()
              const item = getNextFocusItem('prev')
              if (item) focusItem(item)
              setTimeout(() => scrollToFocusedItem(), 0)
              break
            }
            case KeyCode.Home: {
              event.preventDefault()
              const item = getNextFocusItem('first')
              if (item) focusItem(item)
              setTimeout(() => scrollToFocusedItem(), 0)
              break
            }
            case KeyCode.End: {
              event.preventDefault()
              const item = getNextFocusItem('last')
              if (item) focusItem(item)
              setTimeout(() => scrollToFocusedItem(), 0)
              break
            }
            default:
              // do nothing
          }
        }}
        onBlur={() => {
          setFocusedId(null)
        }}
      >
        {props.items.map((item) => {
          const id = item.id
          const selected = !!(props.selectedIds && props.selectedIds.includes(item.id))
          const disabled = !!item.disabled
          return (
            <Item
              {...NodeDataProps({
                'selected': !!selected,
                'disabled': !!disabled,
                'focused': focusedId === id,
              })}
              role="option"
              aria-selected={selected}
              aria-disabled={disabled}
              key={id}
              onClick={() => {
                if (!item.disabled) selectItem(item)
              }}
            >
              {item.content}
            </Item>
          )
        })}
      </Box>
    </Root>
  )
})

export type ListBoxProps = UUIFunctionComponentProps<typeof ListBox>
