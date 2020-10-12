import React, { useState, useRef, useMemo, useCallback } from 'react';
import { UUI, UUIComponentProps } from '../../core/uui';
import { Popover as UUIPopover, PopoverPlacement } from '../Popover';
import { Tag as UUITag } from '../Tag';
import { TextField } from '../Input';
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
  Dropdown: UUIPopover,
  DropdownIcon: Icons.ChevronDown,
  Selector: 'div',
  TagInputContainer: 'div',
  Tag: UUITag,
  Input: TextField,
  SearchMatched: 'span',
  LoadingSpinner: LoadingSpinner,
  ListBox: UUIListBox,
  Section: 'div',
  Option: 'div',
} as const

export const Select = UUI.FunctionComponent({
  name: 'Select',
  nodes: SelectNodes,
}, (props: SelectFeatureProps, nodes) => {
  const {
    Root, Dropdown, DropdownIcon, Selector, Input,
    SearchMatched, TagInputContainer,
    ListBox, Section, Option,
    LoadingSpinner,
    Tag,
  } = nodes

  const finalProps = {
    searchable: props.searchable === undefined ? false : props.searchable,
    dropdownPlacement: props.dropdownPlacement === undefined ? 'bottom-start' : props.dropdownPlacement
  }

  const [active, setActive] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | null>(null)
  const inputRef = useRef<any | null>(null)
  const listBoxRef = useRef<any | null>(null)

  const value = useMemo(() => {
    if (active) {
      return inputValue
    } else {
      const option = findSelectedOption(props)
      return option?.label || null
    }
  }, [props, inputValue, active])

  const placeholder = useMemo(() => {
    if (active && !inputValue && props.value) {
      const selectedOption = findSelectedOption(props)
      return selectedOption?.label
    } else {
      return props.placeholder
    }
  }, [active, inputValue, props])

  const allOptions = useMemo(() => {
    if (isNormalOptions(props)) return props.options
    if (isSectionedOptions(props)) {
      return flatMap(props.sections, (i) => i.options)
    }
    return []
  }, [props])

  const searchedOptions = useMemo(() => {
    if (!inputValue) return null
    const matchedOptions = searchInOptions(inputValue, allOptions, props.onSearch)
        .map((option) => {
          option.content = (
            <>{highlightKeyword(option.label, inputValue, SearchMatched)}</>
          )
          return option
        })
    return matchedOptions
  }, [SearchMatched, allOptions, inputValue, props.onSearch])

  /**
   * ListBox
   */

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

    if (searchedOptions) {
      return searchedOptions.map(getOptionData)
    }

    if (isNormalOptions(props)) {
      return props.options.map(getOptionData) as any[]
    } else if (isSectionedOptions(props)) {
      return chain(props.sections).map(getSectionData).flatMap().value() as any[]
    } else {
      return [] as any[]
    }
  }, [props, searchedOptions])

  const listSelectedIds = useMemo(() => {
    if (!props.value) return []
    if (props.multiple) {
      return compact(props.value.map((i) => allOptions && allOptions.find((j) => j.value === i)?.key))
    } else {
      return compact([allOptions && allOptions.find((j) => j.value === props.value)?.key])
    }
  }, [props.value, props.multiple, allOptions])

  const handleListOnSelect = useCallback((selectedIds: string[]) => {
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
      setActive(false)
    }
  }, [allOptions, props])

  return (
    <Root
      role="select"
      className={classNames({
        'STATE_active': active,
        'STATE_loading': props.loading,
        'STATE_searchable': finalProps.searchable,
      })}
      onFocus={() => { setActive(true) }}
      onKeyDown={(event) => {
        switch (event.keyCode) {
          case KeyCode.Enter:
          case KeyCode.SpaceBar:
            if (!active) {
              setActive(true)
              if (listBoxRef.current && listBoxRef.current.focus) listBoxRef.current.focus()
            }
            break
          case KeyCode.Escape:
            setActive(false)
            break
          default:
            // do nothing
        }
      }}
    >
      <Dropdown
        active={active}
        placement={finalProps.dropdownPlacement}
        onClickAway={() => {
          setActive(false)
          const selectedOption = findSelectedOption(props)
          setInputValue(selectedOption?.label || null)
        }}
        modifiers={[{
          name: "sameWidth",
          enabled: true,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
          },
          effect: ({ state }) => {
            const rect = state.elements.reference.getBoundingClientRect()
            state.elements.popper.style.width = `${rect.width}px`;
            return () => { /** */ }
          }
        }]}
        activator={
          <Selector
            onClick={() => {
              setActive(true)
              inputRef.current && inputRef.current.focus && inputRef.current.focus();
            }}>
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
              <Input
                value={value}
                placeholder={placeholder}
                onChange={(value) => {
                  setInputValue(value.length > 0 ? value : null)
                }}
                customize={{
                  Root: {
                    onClick: () => {
                      setActive((value) => !value)
                      if (!active) {
                        setInputValue('')
                      }
                    }
                  },
                  Input: {
                    ref:  inputRef,
                    readOnly: !finalProps.searchable,
                  },
                }}
              />
            </TagInputContainer>
            {props.loading && (
              <LoadingSpinner width={16} height={16} />
            )}
            <DropdownIcon width={20} height={20} svgrProps={{ strokeWidth: 1 }} />
          </Selector>
        }
      >
        <ListBox
          items={optionListItems}
          disabled={!active}
          selectedIds={listSelectedIds}
          onSelect={handleListOnSelect}
          multiple={props.multiple}
          customize={{
            Box: { ref: listBoxRef },
          }}
        />
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

function highlightKeyword(text: string, keyword: string, HighlightComponent: any) {
  const data = text.split(keyword).map((node, index) => {
    if (index === 0) return node
    else return <React.Fragment key={index}>
      <HighlightComponent key={keyword}>{keyword}</HighlightComponent>
      {node}
    </React.Fragment>
  })
  return data.map((i, index) => <React.Fragment key={index}>{i}</React.Fragment>)
}

function searchInOptions(q: string, options: SelectOption[], predicate?: SelectFeatureProps['onSearch']) {
  return cloneDeep(
    options.filter((i) => predicate
      ? predicate(i, q)
      : i.label.includes(q)
    )
  )
}

const getAllOptions = (props: SelectFeatureProps) => {
  if ((props as any)['options']) {
    const _props = props as SelectOptionsProps
    return _props.options
  } else if ((props as any)['sections']) {
    const _props = props as SelectSectionsProps
    return flatMap(_props.sections, (i) => i.options)
  } else {
    return []
  }
}

const findSelectedOption = (props: SelectFeatureProps) => {
  const allOptions = getAllOptions(props)
  return allOptions.find((i) => i.value === props.value)
}

export type SelectProps = Parameters<typeof Select>[0]
