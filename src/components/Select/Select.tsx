import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Popover as UUIPopover, PopoverPlacement, PopoverPlacementPropTypes } from '../Popover';
import { Tag as UUITag } from '../Tag';
import { TextField as UUITextField } from '../Input';
import { flatMap, compact } from 'lodash-es';
import { Icons } from '../../icons/Icons';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { KeyCode } from '../../utils/keyboardHelper';
import { ListBox as UUIListBox, ListBoxItem } from '../ListBox';
import { UUIFunctionComponent, UUIComponentProps, UUIFunctionComponentProps } from '../../core';
import { createComponentPropTypes, PropTypes, ExtraPropTypes } from '../../utils/createPropTypes';

export interface SelectOption {
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

interface SelectValueProps<
  X extends true | false | boolean | undefined = undefined,
  Y = (X extends undefined ? string : (X extends true ? string[] : string)),
  T = Y | null,
> {
  /**
   * Selected item.
   */
  value: T | null;
  /**
   * Callback invoked when an item is selected.
   */
  onChange: (value: T) => void;
  /**
   *
   */
  multiple?: X;
}

type SelectSectionOptionProps = SelectSectionsProps | SelectOptionsProps

interface BaseSelectFeatureProps {
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
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
  /**
   * Whether the content of Select should be rendered inside a `Portal` where appending inside `portalContainer`(if it provided) or `document.body`.
   * @default false
   */
  usePortal?: boolean;
  /**
   * The container element into which the overlay renders its contents, when `usePortal` is `true`.
   * This prop is ignored if `usePortal` is `false`.
   * @default document.body
   */
  portalContainer?: HTMLElement;

  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export type SelectFeatureProps<X extends true | false | boolean | undefined = undefined> = SelectValueProps<X> & SelectSectionOptionProps & BaseSelectFeatureProps

export const SelectOptionPropTypes = createComponentPropTypes<SelectOption>({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  content: PropTypes.node,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  static: PropTypes.bool,
})
export const SelectPropTypes = createComponentPropTypes<SelectFeatureProps<any>>({
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  dropdownPlacement: PopoverPlacementPropTypes,
  loading: PropTypes.bool,
  usePortal: PropTypes.bool,
  portalContainer: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  options: PropTypes.arrayOf(PropTypes.shape(SelectOptionPropTypes)),
  sections: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.node,
    options: PropTypes.arrayOf(PropTypes.shape(SelectOptionPropTypes)).isRequired,
  })),

  value: ExtraPropTypes.nullable(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
})

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

export const BaseSelect = UUIFunctionComponent({
  name: 'Select',
  nodes: SelectNodes,
  propTypes: SelectPropTypes,
}, (props: SelectFeatureProps<boolean | undefined>, { nodes, NodeDataProps }) => {
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
    disabled: props.disabled === undefined ? false : props.disabled,
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
          {isMultipleValue(props) ? (
            <TagInputContainer>
              {
                props.value &&
                props.value.length > 0 &&
                compact(props.value.map((v) => allOptions?.find((i) => i.value === v)))
                .map((option) => {
                  return (
                    <Tag key={option.key}>{option.label}</Tag>
                  )
                })
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
  }, [Placeholder, Result, Tag, TagInputContainer, allOptions, finalProps.placeholder, props])

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
      return flatMap(props.sections.map(getSectionData)) as any[]
    } else {
      return [] as any[]
    }
  }, [Option, Section, props])

  const optionListSelectedIds = useMemo(() => {
    if (!props.value) return []
    if (isMultipleValue(props)) {
      return compact(props.value.map((i) => allOptions && allOptions.find((j) => j.value === i)?.key))
    } else {
      return compact([allOptions && allOptions.find((j) => j.value === props.value)?.key])
    }
  }, [props, allOptions])

  const optionListHandleOnSelect = useCallback((selectedIds: string[]) => {
    if (isMultipleValue(props)) {
      if (selectedIds.length === 0) {
        props.onChange([])
      } else {
        props.onChange(compact(selectedIds.map((i) => allOptions && allOptions.find((j) => j.key === i)?.value)))
      }
    }
    if (isSingleValue(props)) {
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
  }, [Option, allOptions, props.onSearch, searchInputValue])

  const searchListSelectedIds = useMemo(() => {
    return optionListSelectedIds.filter((id) => {
      return !!searchListItems?.find((item) => item.id === id)
    })
  }, [optionListSelectedIds, searchListItems])
  const searchListHandleOnSelect = useCallback((selectedId: string) => {
    if (!searchInputValue) return
    const option = allOptions.find((i) => i.key === selectedId)
    if (option) {
      if (isMultipleValue(props)) {
        const newValue = Array.from(props.value || [])
        newValue.push(option.value)
        props.onChange(newValue)
      }
      if (isSingleValue(props)) {
        props.onChange(option.value)
      }
    }
  }, [allOptions, props, searchInputValue])
  const searchListHandleOnUnselect = useCallback((selectedId: string) => {
    if (!searchInputValue) return
    const option = allOptions.find((i) => i.key === selectedId)
    if (option) {
      if (isMultipleValue(props) && props.value) {
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
      tabIndex={finalProps.disabled ? -1 : 0}
      {...NodeDataProps({
        'disabled': !!finalProps.disabled,
        'active': !!active,
        'loading': !!props.loading,
        'searchable': !!finalProps.searchable,
      })}
      onKeyDown={(event) => {
        if (finalProps.disabled) return;
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
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <Dropdown
        usePortal={props.usePortal}
        portalContainer={props.portalContainer}
        active={active}
        placement={finalProps.dropdownPlacement}
        referenceElement={ref.current}
        onClickAway={() => {
          if (finalProps.disabled) return;
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
              if (finalProps.disabled) return;
              if (!active) openDropdown()
              else closeDropdown()
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

const isMultipleValue = (props: any): props is SelectFeatureProps<true> => {
  if (props['multiple'] === true) return true
  else return false
}

const isSingleValue = (props: any): props is SelectFeatureProps<false> => {
  if (props['multiple'] === undefined || props['multiple'] === false) return true
  else return false
}

function searchInOptions(q: string, options: SelectOption[], predicate?: SelectFeatureProps<boolean | undefined>['onSearch']) {
  return options.filter((i) => predicate
    ? predicate(i, q)
    : i.label.includes(q)
  )
}

export function Select<X extends true | false | boolean | undefined = undefined>(props: UUIComponentProps<SelectFeatureProps<X>, typeof SelectNodes>) {
  const _BaseSelect = BaseSelect as any
  return <_BaseSelect {...props} />
}
Select.displayName = `<UUI> [GenericComponent] Radio`
export type SelectProps = UUIFunctionComponentProps<typeof Select>
