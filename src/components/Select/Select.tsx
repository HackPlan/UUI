import React, { useState, useRef, useMemo, useCallback } from 'react';
import { UUI } from '../../core/uui';
import { Popover as UUIPopover, PopoverPlacement } from '../Popover';
import { Tag as UUITag } from '../Tag';
import { TextField as UUITextField } from '../Input';
import { flatMap, cloneDeep, chain, compact } from 'lodash';
import classNames from 'classnames';
import { Icons } from '../../icons/Icons';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { KeyCode } from '../../utils/keyboardHelper';
import { ListBox as UUIListBox, ListBoxItem } from '../ListBox';

interface SelectOption {
  key: string;
  label: string;
  content?: React.ReactNode;
  value: string;
  /**
   * Whether the option of select is non-interactive.
   * @default false
   */
  disabled?: boolean;
  static?: boolean;
}

interface SelectOptionsProps {
  /**
   * Options of Select.
   */
  options: SelectOption[];
}

interface SelectSectionsProps {
  /**
   * Sections of Options of Select.
   */
  sections: {
    key: string;
    label?: React.ReactNode;
    options: SelectOption[];
  }[];
}

interface SelectSingleValueProps {
  /**
   * Selected item.
   */
  value: string | null;
  /**
   * Callback invoked when an item is selected.
   */
  onChange: (value: string | null) => void;
  /**
   *
   */
  multiple?: false;
}

interface SelectMultipleValueProps {
  /**
   * Selected item.
   */
  value: string[] | null;
  /**
   * Callback invoked when an item is selected.
   */
  onChange: (value: string[] | null) => void;
  /**
   *
   */
  multiple: true;
}

type SelectValueProps = SelectSingleValueProps | SelectMultipleValueProps
type SelectSectionOptionProps = SelectSectionsProps | SelectOptionsProps

interface BaseSelectFeatureProps {
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
    /**
   * enable inputting text to search options.
   */
  searchable?: boolean;
  searchPlaceholder?: string;
  /**
   * The custom search function, it invoked per option iteration.
   */
  onSearch?: (option: SelectOption, q: string) => boolean;
  /**
   * dropdown placement
   */
  dropdownPlacement?: PopoverPlacement;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
}

export type SelectFeatureProps = SelectValueProps & SelectSectionOptionProps & BaseSelectFeatureProps

const SelectNodes = {
  Root: 'div',
  Activator: 'div',
  Placeholder: 'div',
  Result: 'div',
  Dropdown: UUIPopover,
  DropdownIcon: Icons.ChevronDown,
  TagInputContainer: 'div',
  Tag: UUITag,
  SearchMatched: 'span',
  ActionBox: 'div',
  LoadingSpinner: LoadingSpinner,
  OptionList: UUIListBox,
  Section: 'div',
  Option: 'div',
  SearchInput: UUITextField,
  SearchIcon: Icons.Search,
  SearchList: UUIListBox,

} as const

export const Select = UUI.FunctionComponent({
  name: 'Select',
  nodes: SelectNodes,
}, (props: SelectFeatureProps, nodes) => {
  const {
    Root, Dropdown, DropdownIcon,
    Activator, Result, Placeholder,
    TagInputContainer,
    ActionBox,
    OptionList, Section, Option,
    SearchList, SearchInput, SearchIcon,
    LoadingSpinner,
    Tag,
  } = nodes

  const finalProps = {
    searchable: props.searchable === undefined ? false : props.searchable,
    placeholder: props.placeholder || 'select options...',
    searchPlaceholder: props.searchPlaceholder || 'Search options...',
    dropdownPlacement: props.dropdownPlacement === undefined ? 'bottom-start' : props.dropdownPlacement
  }

  const [active, setActive] = useState<boolean>(false)
  const [searchInputValue, setSearchInputValue] = useState('')
  const ref = useRef<any>(null)

  const allOptions = useMemo(() => {
    if (isNormalOptions(props)) return props.options
    if (isSectionedOptions(props)) {
      return flatMap(props.sections, (i) => i.options)
    }
    return []
  }, [props])

  const openDropdown = useCallback(() => {
    setActive(true)
  }, [])

  const closeDropdown = useCallback(() => {
    setActive(false)
    setSearchInputValue('')
  }, [])

  /**
   * ListBox
   */

  const displayResult = useMemo(() => {
    return props.value && props.value.length > 0
      ? (
        <Result>
          {props.multiple ? (
            <TagInputContainer>
              {
                props.multiple &&
                props.value &&
                props.value.length > 0 &&
                chain(props.value)
                  .map((v) => allOptions?.find((i) => i.value === v))
                  .compact()
                  .map((option) => {
                    return (
                      <Tag key={option.key}>{option.label}</Tag>
                    )
                  })
                  .value()
              }
            </TagInputContainer>
          ) : (
            allOptions?.find((i) => i.value === props.value)?.label
          )}
        </Result>
      )
      : (
        <Placeholder>{finalProps.placeholder}</Placeholder>
      )
  }, [allOptions, finalProps.placeholder, props.multiple, props.value])

  const optionListItems = useMemo<ListBoxItem[]>(() => {
    const getOptionData = (i: SelectOption) => ({
      id: i.key,
      content: <Option>{i.content || i.label}</Option>,
    })
    const getSectionData = (i: {
      key: string | number;
      label?: React.ReactNode;
      options: SelectOption[];
    }) => {
      return [
        { id: i.key, content: <Section>{i.label}</Section>, disabled: true },
        ...i.options.map(getOptionData),
      ]
    }

    if (isNormalOptions(props)) {
      return props.options.map(getOptionData) as any[]
    } else if (isSectionedOptions(props)) {
      return chain(props.sections).map(getSectionData).flatMap().value() as any[]
    } else {
      return [] as any[]
    }
  }, [props])

  const optionListSelectedIds = useMemo(() => {
    if (!props.value) return []
    if (props.multiple) {
      return compact(props.value.map((i) => allOptions && allOptions.find((j) => j.value === i)?.key))
    } else {
      return compact([allOptions && allOptions.find((j) => j.value === props.value)?.key])
    }
  }, [props.value, props.multiple, allOptions])

  const optionListHandleOnSelect = useCallback((selectedIds: string[]) => {
    if (props.multiple) {
      if (selectedIds.length === 0) {
        props.onChange([])
      } else {
        props.onChange(compact(selectedIds.map((i) => allOptions && allOptions.find((j) => j.key === i)?.value)))
      }
    } else {
      if (selectedIds.length === 0) {
        props.onChange(null)
      } else {
        props.onChange((allOptions && allOptions.find((j) => j.key === selectedIds[0])?.value) || null)
      }
      closeDropdown()
    }
  }, [allOptions, closeDropdown, props])

  const searchListItems = useMemo(() => {
    if (!searchInputValue) return null
    const matchedOptions = searchInOptions(searchInputValue, allOptions, props.onSearch)
    return matchedOptions.map((option) => {
      return {
        id: option.key,
        content: (
          <Option>{option.label}</Option>
        ),
      }
    })
  }, [allOptions, props.onSearch, searchInputValue])

  const searchListSelectedIds = useMemo(() => {
    return optionListSelectedIds.filter((id) => {
      return !!searchListItems?.find((item) => item.id === id)
    })
  }, [optionListSelectedIds, searchListItems])
  const searchListHandleOnSelect = useCallback((selectedId: string) => {
    if (!searchInputValue) return
    const option = allOptions.find((i) => i.key === selectedId)
    if (option) {
      if (props.multiple) {
        const newValue = Array.from(props.value || [])
        newValue.push(option.value)
        props.onChange(newValue)
      } else {
        props.onChange(option.value)
      }
    }
  }, [allOptions, props, searchInputValue])
  const searchListHandleOnUnselect = useCallback((selectedId: string) => {
    if (!searchInputValue) return
    const option = allOptions.find((i) => i.key === selectedId)
    if (option) {
      if (props.multiple && props.value) {
        const index = props.value.findIndex((i) => i === selectedId)
        const newValue = Array.from(props.value)
        newValue.splice(index, 1)
        props.onChange(newValue)
      } else {
        props.onChange(null)
      }
    }
  }, [allOptions, props, searchInputValue])

  return (
    <Root
      ref={ref}
      role="select"
      className={classNames({
        'STATE_active': active,
        'STATE_loading': props.loading,
        'STATE_searchable': finalProps.searchable,
      })}
      onFocus={() => { openDropdown() }}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            if (!active) {
              openDropdown()
            }
            break
          case KeyCode.Escape:
            closeDropdown()
            break
          default:
            // do nothing
        }
      }}
    >
      <Dropdown
        active={active}
        placement={finalProps.dropdownPlacement}
        referenceElement={ref.current}
        onClickAway={() => {
          closeDropdown()
        }}
        // modifiers for fix dropdown dynamic offset update
        modifiers={[{
          name: "dynamic_offset",
          enabled: true,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: () => { /** */ },
          effect: () => { return () => { /** */ } },
        }]}
        activator={
          <Activator
            onClick={() => {
              openDropdown()
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
          {(searchListItems) ? (
            <SearchList
              items={searchListItems}
              selectedIds={searchListSelectedIds}
              onSelect={searchListHandleOnSelect}
              onUnselect={searchListHandleOnUnselect}
              multiple={props.multiple}
            />
          ) : (
            <OptionList
              items={optionListItems}
              disabled={!active}
              selectedIds={optionListSelectedIds}
              onSelected={optionListHandleOnSelect}
              multiple={props.multiple}
            />
          )}
        </ActionBox>
      </Dropdown>
    </Root>
  )
})

const isSectionedOptions = (props: any): props is SelectSectionsProps => {
  if ((props as any)['sections']) return true
  else return false
}
const isNormalOptions = (props: any): props is SelectOptionsProps => {
  if ((props as any)['options']) return true
  else return false
}

function searchInOptions(q: string, options: SelectOption[], predicate?: SelectFeatureProps['onSearch']) {
  return options.filter((i) => predicate
    ? predicate(i, q)
    : i.label.includes(q)
  )
}

export type SelectProps = Parameters<typeof Select>[0]
