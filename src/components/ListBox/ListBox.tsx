import React, { useState, useRef, useCallback } from 'react';
import { UUI, UUIFunctionComponentProps } from '../../core/uui';
import classNames from 'classnames';
import { KeyCode } from '../../utils/keyboardHelper';

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
  onSelect?: (ids: string[]) => void;
}

export const ListBox = UUI.FunctionComponent({
  name: 'ListBox',
  nodes: {
    Root: 'div',
    Box: 'ul',
    Item: 'li',
  },
}, (props: ListBoxFeatureProps, nodes) => {
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
      const focusedItem = listRef.current.querySelector('.UUI-ListBox-Item.STATE_focused') as HTMLLIElement | null
      if (focusedItem) {
        focusedItem.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'smooth',
        })
      }
    }
  }, [])

  const selectItem = useCallback((item: ListBoxItem) => {
    if (props.multiple) {
      const idsSet = new Set(props.selectedIds)
      if (idsSet.has(item.id)) idsSet.delete(item.id)
      else idsSet.add(item.id)
      const newSelectedIds = Array.from(idsSet)
      props.onSelect && props.onSelect(newSelectedIds)
    } else {
      props.onSelect && props.onSelect([item.id])
    }
  }, [props])

  return (
    <Root
      className={classNames({
        'STATE_disabled': !!props.disabled,
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
              role="option"
              aria-selected={selected}
              aria-disabled={disabled}
              className={classNames({
                'STATE_selected': selected,
                'STATE_disabled': disabled,
                'STATE_focused': focusedId === id,
              })}
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
