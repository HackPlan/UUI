import React, { useState, useRef, useCallback } from 'react';
import { UUI, UUIComponentProps } from '../../utils/uui';
import { Popover as UUIPopover, TextField } from '../..';
import { flatMap } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';


interface SelectItem<T extends string | number> {
  label: string;
  content?: React.ReactNode;
  value: T;
}

interface BaseCommonSelectProps<T extends string | number> {
  /**
   * Selected item.
   */
  value: T | null;
  /**
   * Callback invoked when an item is selected.
   */
  onChange: (value: T | null) => void;
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
}

interface SelectItemsProps<T extends string | number> extends BaseCommonSelectProps<T> {
  /**
   * Option items of Select.
   */
  items: SelectItem<T>[];
}

interface SelectSectionsProps<T extends string | number> extends BaseCommonSelectProps<T> {
  /**
   * Option items of Select.
   */
  sections: {
    label: React.ReactNode;
    items: SelectItem<T>[];
  }[];
}

export type BaseSelectProps<T extends string | number> = SelectSectionsProps<T> | SelectItemsProps<T>

const SelectNodes = {
  Root: 'div',
  Dropdown: UUIPopover,
  DropdownIcon: 'div',
  Selector: 'div',
  Input: TextField,
  SectionList: 'div',
  Section: 'div',
  SectionHeader: 'div',
  ItemList: 'div',
  Item: 'div',
} as const

const BaseSelect = UUI.FunctionComponent({
  name: 'Select',
  nodes: SelectNodes,
}, (props: BaseSelectProps<any>, nodes) => {
  const { Root, Dropdown, DropdownIcon, Selector, Input, SectionList, Section, SectionHeader, ItemList, Item } = nodes

  const [active, setActive] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [textPlaceholder, setTextPlaceholder] = useState<string | undefined>(props.placeholder)
  const inputRef = useRef<any | null>(null)

  const getAllItems = useCallback(() => {
    if ((props as any)['items']) {
      const _props = props as SelectItemsProps<any>
      return _props.items
    } else if ((props as any)['sections']) {
      const _props = props as SelectSectionsProps<any>
      return flatMap(_props.sections, (i) => i.items)
    } else {
      return []
    }
  }, [props])

  const renderItemList = useCallback((items: SelectItem<any>[]) => {
    return items.map((item, index) => {
      return (
        <ItemList key={index}>
          <Item
            onClick={() => {
              props.onChange(item.value)
              setActive(false)
              setText(item.label)
            }}
          >
            {item.content || item.label}
          </Item>
        </ItemList>
      )
    })
  }, [props])

  const renderSection = useCallback(() => {
    if ((props as any)['items']) {
      const _props = props as SelectItemsProps<any>
      return renderItemList(_props.items)
    } else if ((props as any)['sections']) {
      const _props = props as SelectSectionsProps<any>
      return _props.sections.map((section, index) => {
        return (
          <Section key={index}>
            <SectionHeader>{section.label}</SectionHeader>
            {renderItemList(section.items)}
          </Section>
        )
      })
    }
  }, [props, renderItemList])

  return (
    <Root
      className={classNames({
        'Active': active,
      })}
    >
      <Dropdown
        active={active}
        placement={'bottom-start'}
        onClickAway={() => { setActive(false) }}
        activator={
          <Selector
            onClick={() => {
              setActive(true)
              inputRef.current && inputRef.current.focus && inputRef.current.focus();
            }}>
            <Input
              value={text}
              onChange={(value) => {
                setText(value)
                if (value === '') {
                  props.onChange(null)
                }
              }}
              placeholder={textPlaceholder}
              customize={{
                Root: {
                  extendChildrenAfter: (
                    <DropdownIcon>
                      <Icons.ChevronDown width={20} height={20} svgrProps={{ strokeWidth: 1 }}></Icons.ChevronDown>
                    </DropdownIcon>
                  )
                },
                Input: {
                  ref:  inputRef,
                  onFocus: () => {
                    const allItems = getAllItems()
                    const text =  props.value && allItems.find((i) => i.value === props.value)?.label || ''
                    setText('')
                    setTextPlaceholder(text)
                  },
                  onBlur: () => {
                    const allItems = getAllItems()
                    const text =  props.value && allItems.find((i) => i.value === props.value)?.label || ''
                    setText(text)
                    setTextPlaceholder(props.placeholder)
                  },
                  readOnly: true,
                },
              }}
            />
          </Selector>
        }
      >
        <SectionList>
          {renderSection()}
        </SectionList>
      </Dropdown>
    </Root>
  )
})

export function Select<T extends string | number>(props: UUIComponentProps<BaseSelectProps<T>, typeof SelectNodes>) {
  return <BaseSelect {...props} />
}
export type SelectProps = Parameters<typeof Select>[0]
