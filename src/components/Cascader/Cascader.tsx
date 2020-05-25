import React, { useState, useMemo } from 'react';
import { UUI } from '../../core/uui';
import { Popover } from '../Popover';
import { TextField } from '../Input';
import { pick, clone } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';

export interface CascaderOption {
  value: string;
  /**
   * for input text display.
   */
  label: string;
  /**
   * for custom render view.
   * if content and label are both provided, priority display content in option view.
   */
  content?: React.ReactNode;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface BaseCascaderProps {
  /**
   * Option items of Cascader.
   */
  options: CascaderOption[];
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
  /**
   * The value to display in the input field.
   */
  value: string[] | null;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: string[] | null) => void;
  /**
   * Indicate which type to trigger expand item list.
   * @default click
   */
  expandTriggerType: 'click' | 'hover';
  /**
   * only invoke onChange when the final level option item select.
   * @default true
   */
  changeOnFinalSelect: boolean;
  /**
   * enable inputting text to search options.
   * @default false
   */
  searchable?: boolean;
  /**
   * The custom search function, it invoked per option iteration.
   */
  onSearch?: (option: CascaderOption, q: string) => boolean;
}

export const Cascader = UUI.FunctionComponent({
  name: 'Cascader',
  nodes: {
    Root: 'div',
    Dropdown: Popover,
    DropdownIcon: 'div',
    Input: TextField,
    LevelList: 'div',
    SectionList: 'div',
    ItemList: 'div',
    Item: 'div',
    ItemLabel: 'div',
    ItemIcon: 'div',
    SearchList: 'div',
    SearchItem: 'div',
    SearchMatched: 'span',
  },
}, (props: BaseCascaderProps, nodes) => {
  /**
   * Component Nodes Spread
   */
  const {
    Root, Dropdown, DropdownIcon, Input,
    LevelList, ItemList, Item, ItemLabel, ItemIcon,
    SearchList, SearchItem, SearchMatched,
  } = nodes

  /**
   * Default props value
   */
  const finalProps = {
    expandTriggerType: props.expandTriggerType || 'click',
    searchable: props.searchable === undefined ? false : props.searchable,
    changeOnFinalSelect: props.changeOnFinalSelect === undefined ? true : props.changeOnFinalSelect,
  }

  /**
   * Component Inner States
   */
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue(props.value, (finalValue) => { props.onChange(finalValue) })
  const [popoverActive, setPopoverActive] = useState(false)
  const [inputValue, setInputValue] = useState<string | null>(null)

  /**
   * Generate tree hierarchy data of cascade options for rendering.
   */
  type Levels = (CascaderOption & {
    selectedOption: Omit<CascaderOption, 'children'>[];
    selected: boolean;
  })[][]
  const levels = useMemo(() => {
    const dfs = (data: Levels, index: number, selectedOption: CascaderOption[], options: CascaderOption[]) => {
      const getNewSelectedOption = (option: CascaderOption) => [...selectedOption, pick(option, 'value', 'label')]
      const getSelected = (option: CascaderOption) => innerValue ? option.value === innerValue[index] : false
      data.push(options.map((i) => ({ ...i, selectedOption: getNewSelectedOption(i), selected: getSelected(i) })))
      if (innerValue && innerValue[index]) {
        const value = innerValue[index]
        const option = options.find((option) => option.value === value)
        if (option && option.children) {
          dfs(data, index+1, getNewSelectedOption(option), option.children)
        }
      }
    }
    const data: Levels = []
    dfs(data, 0, [], props.options)
    return data
  }, [props.options, innerValue])

  const placeholder = useMemo(() => {
    if (popoverActive && !inputValue && props.value) {
      const selectedOptions = findSelectedOptions(props.value, props.options)
      return generateLabel(selectedOptions) || props.placeholder
    } else {
      return props.placeholder
    }
  }, [popoverActive, inputValue, props.value, props.options, props.placeholder])

  const searchMatchedOptions = useMemo(() => {
    if (!inputValue) return []
    return searchInOptions(inputValue, props.options, props.onSearch)
  }, [inputValue, props.onSearch, props.options])

  const [showSearchList, showLevelList] = useMemo(() => {
    if (!finalProps.searchable) return [false, true]
    if (inputValue) return [true, false]
    else return [false, true]
  }, [finalProps.searchable, inputValue])

  return (
    <Root
      className={classNames({
        'Active': popoverActive,
        'Searchable': finalProps.searchable,
      })}
    >
      <Dropdown
        active={popoverActive}
        placement={'bottom-start'}
        onClickAway={() => {
          setPopoverActive(false)
          const selectedOptions = findSelectedOptions(props.value, props.options)
          setInputValue(generateLabel(selectedOptions))
          resetInnerValue()
        }}
        activator={
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(value) => {
              setInputValue(value.length > 0 ? value : null)
            }}
            customize={{
              Root: {
                onFocus: () => {
                  setPopoverActive(true)
                  setInputValue('')
                },
                extendChildrenAfter: (
                  <DropdownIcon>
                    <Icons.ChevronDown width={20} height={20} svgrProps={{ strokeWidth: 1 }}></Icons.ChevronDown>
                  </DropdownIcon>
                )
              },
              Input: {
                readOnly: !finalProps.searchable,
              },
            }}
          />
        }
      >
        {showLevelList && (
          <LevelList>
            {levels.map((options, levelIndex) => {
              return (
                <ItemList key={levelIndex}>
                  {options.map((option, optionIndex) => {
                    return (
                      <Item
                        className={classNames({
                          'Selected': option.selected,
                          'Disabled': option.disabled,
                        })}
                        key={optionIndex}
                        onClick={() => {
                          if (option.disabled) return
                          const newValue = option.selectedOption.map((i) => i.value)
                          if (option.children) {
                            setInnerValue(newValue, !finalProps.changeOnFinalSelect)
                          } else if (!option.children) {
                            setPopoverActive(false)
                            setInnerValue(newValue, true)
                            const selectedOptions = findSelectedOptions(newValue, props.options)
                            setInputValue(generateLabel(selectedOptions))
                          }
                        }}
                        onMouseEnter={() => {
                          if (finalProps.expandTriggerType !== 'hover') return
                          if (option.disabled) return
                          if (!option.children) return
                          const newValue = option.selectedOption.map((i) => i.value)
                          setInnerValue(newValue)
                        }}
                      >
                        <ItemLabel>{option.content || option.label}</ItemLabel>
                        <ItemIcon>
                          <Icons.ChevronRight
                            className={classNames({
                              'Hidden': !option.children,
                            })}
                            svgrProps={{ strokeWidth: 1 }}
                          />
                        </ItemIcon>
                      </Item>
                    )
                  })}
                </ItemList>
              )
            })}
          </LevelList>
        )}
        {showSearchList && (
          <SearchList>
            {searchMatchedOptions.map((group, groupIndex) => {
              const disabled = group.some((i) => i.disabled)
              return (
                <SearchItem
                  className={classNames({
                    'Disabled': disabled,
                  })}
                  key={groupIndex}
                  onClick={() => {
                    if (disabled) return
                    setPopoverActive(false)
                    const newValue = group.map((i) => i.value)
                    setInnerValue(newValue, true)
                    const selectedOptions = findSelectedOptions(newValue, props.options)
                    setInputValue(generateLabel(selectedOptions))
                  }}
                >
                  {group.map((option, index) => {
                    const highlighted = highlightKeyword(option.label, inputValue || '', SearchMatched)
                    return <>
                      {index !== 0 && ' / '}
                      {highlighted.map((i) => i)}
                    </>
                  })}
                </SearchItem>
              )
            })}
          </SearchList>
        )}
      </Dropdown>
    </Root>
  )
})

export type CascaderProps = Parameters<typeof Cascader>[0]


function findSelectedOptions(value: string[] | null, options: CascaderOption[]) {
  if (!value || value.length === 0) return []
  const dfs = (data: CascaderOption[], index: number, options: CascaderOption[]) => {
    if (!value[index]) return
    const option = options.find((option) => option.value === value[index])
    if (!option) return
    data.push(option)
    if (option.children) {
      dfs(data, index+1, option.children)
    }
  }
  const data: CascaderOption[] = []
  dfs(data, 0, options)
  return data
}

function highlightKeyword(text: string, keyword: string, HighlightComponent: any) {
  const data = text.split(keyword).map((node, index) => {
    if (index === 0) return node
    else return <>
      <HighlightComponent key={keyword}>{keyword}</HighlightComponent>
      {node}
    </>
  })
  return data.map((i) => <>{i}</>)
}

function searchInOptions(q: string, options: CascaderOption[], predicate?: BaseCascaderProps['onSearch']) {
  const current: CascaderOption[] = []
  const flatOptions: CascaderOption[][] = []
  const initialOption: CascaderOption = {
    label: '', value: '',
    children: options
  }
  const backtracking = (current: CascaderOption[], flatOptions: CascaderOption[][], option: CascaderOption) => {
    if (!option.children) {
      const searched = current.some((i) => !!(i as any)['matched'])
      if (searched) flatOptions.push(clone(current.map((i) => {
        delete (i as any)['matched']
        return i
      })))
      return
    }
    for (const child of option.children) {
      (child as any)['matched'] = (() => { return predicate ? predicate(child, q) : child.label.includes(q) })()
      current.push(child)
      backtracking(current, flatOptions, child)
      current.pop()
    }
  }
  backtracking(current, flatOptions, initialOption)

  return flatOptions
}

function generateLabel(options: CascaderOption[]) {
  return options.map((i) => i.label).join(' / ')
}
