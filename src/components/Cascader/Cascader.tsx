import React, { useState, useMemo, useCallback } from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { Popover, PopoverPlacement } from '../Popover';
import { ListBox as UUIListBox, ListBoxItem } from '../ListBox';
import { TextField as UUITextField } from '../Input';
import { pick, clone } from 'lodash-es';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';
import { usePendingValue } from '../../hooks/usePendingValue';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import ReactHelper from '../../utils/ReactHelper';
import { KeyCode } from '../../utils/keyboardHelper';

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

  /**
   * Whether the option of cascader is non-interactive.
   * @default false
   */
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderFeatureProps {
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
  searchPlaceholder?: string;
  /**
   * The custom search function, it invoked per option iteration.
   */
  onSearch?: (option: CascaderOption, q: string) => boolean;
  /**
   * dropdown placement
   */
  dropdownPlacement?: PopoverPlacement;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the content of Cascader should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
   * @default false
   */
  usePortal?: boolean;
  /**
   * The container element into which the overlay renders its contents, when `usePortal` is `true`.
   * This prop is ignored if `usePortal` is `false`.
   * @default document.body
   */
  portalContainer?: HTMLElement;
}

export const Cascader = UUIFunctionComponent({
  name: 'Cascader',
  nodes: {
    Root: 'div',
    Activator: 'div',
    Placeholder: 'div',
    Result: 'div',
    DisplayValue: 'span',
    DisplayValueSeparator: 'span',
    Dropdown: Popover,
    DropdownIcon: Icons.ChevronDown,
    ActionBox: 'div',
    LevelList: 'div',
    OptionList: UUIListBox,
    Option: 'div',
    OptionLabel: 'div',
    OptionIcon: Icons.ChevronRight,
    SearchInput: UUITextField,
    SearchIcon: Icons.Search,
    SearchList: UUIListBox,
    SearchMatched: 'span',
    LoadingSpinner: LoadingSpinner,
  },
}, (props: CascaderFeatureProps, { nodes }) => {
  /**
   * Component Nodes Spread
   */
  const {
    Activator, Result, Placeholder,
    DisplayValue, DisplayValueSeparator,
    Root, Dropdown, DropdownIcon,
    LevelList, LoadingSpinner,
    SearchList, SearchIcon,
    OptionList, Option, OptionLabel, OptionIcon,
    ActionBox, SearchInput,
  } = nodes

  /**
   * Default props value
   */
  const finalProps = {
    placeholder: props.placeholder || 'select options...',
    searchPlaceholder: props.searchPlaceholder || 'Search options...',
    expandTriggerType: props.expandTriggerType || 'click',
    searchable: props.searchable === undefined ? false : props.searchable,
    changeOnFinalSelect: props.changeOnFinalSelect === undefined ? true : props.changeOnFinalSelect,
    dropdownPlacement: props.dropdownPlacement === undefined ? 'bottom-start' : props.dropdownPlacement
  }

  /**
   * Component Inner States
   */
  const [innerValue, setInnerValue, resetInnerValue] = usePendingValue(props.value, props.onChange)
  const [popoverActive, setPopoverActive] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

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

  const renderValueResult = useCallback((options: CascaderOption[]) => {
    return (
      <Result>
        {ReactHelper.join(
          options.map((option) => {
            return (
              <DisplayValue key={option.value}>{option.content || option.label}</DisplayValue>
            )
          }),
          <DisplayValueSeparator>/</DisplayValueSeparator>
        )}
      </Result>
    )
  }, [])

  const valueResult = useMemo(() => {
    if (!props.value || props.value.length === 0) return null
    const selectedOptions = findSelectedOptions(props.value, props.options)
    return renderValueResult(selectedOptions)
  }, [props.options, props.value, renderValueResult])

  const displayResult = useMemo(() => {
    return props.value && props.value.length > 0
      ? valueResult
      : <Placeholder>{finalProps.placeholder}</Placeholder>
  }, [finalProps.placeholder, props.value, valueResult])

  /**
   * manage option ListBox data
   */

  const optionListDataOfLevels = useMemo(() => {
    return levels.map((level, levelIndex) => {
      const items: ListBoxItem[] = level.map((option) => {
        return {
          id: option.value,
          content: (
            <Option
              onMouseEnter={() => {
                if (finalProps.expandTriggerType !== 'hover') return
                if (option.disabled) return
                if (!option.children) return

                const newValue = [
                  ...(innerValue || []).slice(0, levelIndex),
                  option.value,
                ]
                setInnerValue(newValue)
              }}
            >
              <OptionLabel>{option.content || option.label}</OptionLabel>
              <OptionIcon
                className={classNames({
                  'STATE_hidden': !option.children,
                })}
                svgrProps={{ strokeWidth: 1 }}
              />
            </Option>
          ),
          disabled: option.disabled,
        }
      })
      const option = level.find((option) => option.selected)
      const selectedIds = option ? [option.value] : []

      const handleOnSelect = (selectedIds: string[]) => {
        if (selectedIds && selectedIds.length === 0) return

        const selectedOption = findOneInAllOptions(selectedIds[0], props.options)
        if (!selectedOption) return

        const newValue = (innerValue || []).slice(0, levelIndex)
        if (selectedIds && selectedIds[0]) {
          newValue.push(selectedIds[0])
        }

        const isLastLevel = !selectedOption.children
        const changeOnFinalSelect = finalProps.changeOnFinalSelect

        if (isLastLevel) {
          setInnerValue(newValue, true)
          setPopoverActive(false)
        } else {
          setInnerValue(newValue, !changeOnFinalSelect)
        }
      }
      return { items, selectedIds, handleOnSelect }
    })
  }, [levels, finalProps.expandTriggerType, finalProps.changeOnFinalSelect, innerValue, setInnerValue, props.options])

  const searchListData = useMemo(() => {
    if (!searchInputValue) return null
    const matchedOptionsGroup = searchInOptions(searchInputValue, props.options, props.onSearch)
    const items = matchedOptionsGroup.map((options) => {
      const matchedSearchOptionId = JSON.stringify(options.map((i) => i.value))
      return {
        id: matchedSearchOptionId,
        content: (
          <Option>{renderValueResult(options)}</Option>
        ),
      }
    })
    const selectedIds: string[] = []
    const handleOnSelect = (selectedIds: string[]) => {
      if (selectedIds && selectedIds.length === 0) return
      const matchedSearchOptionId = selectedIds[0]
      const newValue = JSON.parse(matchedSearchOptionId)
      setInnerValue(newValue, true)
      setPopoverActive(false)
    }
    return { items, selectedIds, handleOnSelect }
  }, [props.onSearch, props.options, renderValueResult, searchInputValue, setInnerValue])

  return (
    <Root
      role="select"
      tabIndex={0}
      className={classNames({
        'STATE_active': popoverActive,
        'STATE_loading': props.loading,
        'STATE_searchable': finalProps.searchable,
      })}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            if (!popoverActive) {
              setPopoverActive(true)
            }
            break
          case KeyCode.Escape:
            setPopoverActive(false)
            break
          default:
            // do nothing
        }
      }}
    >
      <Dropdown
        usePortal={props.usePortal}
        portalContainer={props.portalContainer}
        active={popoverActive}
        placement={finalProps.dropdownPlacement}
        onClickAway={() => {
          setPopoverActive(false)
          resetInnerValue()
          setSearchInputValue('')
        }}
        activator={
          <Activator
            onClick={() => {
              setPopoverActive((value) => !value)
            }}
          >
            {displayResult}
            {props.loading && (
              <LoadingSpinner width={16} height={16} />
            )}
            <DropdownIcon width={20} height={20} svgrProps={{ strokeWidth: 1 }} />
          </Activator>
        }
      >
        <ActionBox>
          {props.searchable && (
            <SearchInput
              value={searchInputValue}
              onChange={(value) => { setSearchInputValue(value) }}
              placeholder={finalProps.searchPlaceholder}
              customize={{
                Root: {
                  extendChildrenBefore: (
                    <SearchIcon />
                  )
                }
              }}
            />
          )}
          {searchListData ? (
            <SearchList
              items={searchListData.items}
              selectedIds={searchListData.selectedIds}
              onSelected={searchListData.handleOnSelect}
            />
          ) : (
            <LevelList>
              {optionListDataOfLevels.map((data, levelIndex) => {
                return (
                  <OptionList
                    key={levelIndex}
                    items={data.items}
                    selectedIds={data.selectedIds}
                    onSelected={data.handleOnSelect}
                  />
                )
              })}
            </LevelList>
          )}
        </ActionBox>
      </Dropdown>
    </Root>
  )
})

export type CascaderProps = UUIFunctionComponentProps<typeof Cascader>

function findOneInAllOptions(value: string | null, options: CascaderOption[]): CascaderOption | null {
  if (value === null) return null
  const dfs = (options?: CascaderOption[]): CascaderOption | null => {
    if (!options) return null
    for (const option of options) {
      if (option.value === value) return option
      const result = dfs(option.children)
      if (result) return result
    }
    return null
  }
  return dfs(options)
}

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

function searchInOptions(q: string, options: CascaderOption[], predicate?: CascaderFeatureProps['onSearch']) {
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
