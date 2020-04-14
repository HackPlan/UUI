import React from 'react';
import { UUI } from '../../utils/uui';
import { Popover as UUIPopover, TextField } from '../..';
import './Select.scss';

export interface BaseSelectProps<T> {
  /**
   * Option items of Select.
   */
  items: T[]
  /**
   * Delegate for rendering item content view.
   */
  onItemRender: (item: T, index: number) => React.ReactNode
  /**
   * Delegate for indicating item label text.
   */
  onItemLabel: (item: T) => string
  /**
   * Selected item.
   */
  value: T | null
  /**
   * Callback invoked when an item is selected.
   */
  onChange: (value: T | null) => void
  /**
   * Placeholder text when there is no value.
   * @default none
   */
  placeholder?: string
}

export interface SelectState<T> {
  active: boolean
  text: string
  textPlaceholder?: string
}

const SelectNodes = {
  Root: 'div',
  Dropdown: UUIPopover,
  Selector: 'div',
  Input: TextField,
  ItemList: 'div',
  Item: 'div',
} as const

export class Select<T> extends UUI.ClassComponent({
  name: 'Select',
  nodes: SelectNodes,
})<BaseSelectProps<T>, SelectState<T>> {

  state: SelectState<T> = {
    active: false,
    text: '',
    textPlaceholder: undefined,
  }

  constructor(props: BaseSelectProps<T>) {
    super(props)
    const text = props.value ? props.onItemLabel(props.value) : ''
    const textPlaceholder = props.placeholder
    this.state = {
      active: false,
      text,
      textPlaceholder,
    }
  }

  render() {
    const { Root, Dropdown, Selector, Input, ItemList, Item } = this.nodes

    return (
      <Root>
        <Dropdown
          active={this.state.active}
          placement={'bottom-start'}
          onClickAway={() => { this.setState({ active: false }) }}
          activator={
            <Selector onClick={() => { this.setState({ active: true }) }}>
              <Input
                value={this.state.text}
                onChange={(value) => {
                  this.setState({ text: value })
                  if (value === '') {
                    this.props.onChange(null)
                  }
                }}
                placeholder={this.state.textPlaceholder}
                customize={{
                  Input: {
                    onFocus: () => {
                      const text = this.props.value ? this.props.onItemLabel(this.props.value) : ''
                      this.setState({ text: '', textPlaceholder: text })
                    },
                    onBlur: () => {
                      const text = this.props.value ? this.props.onItemLabel(this.props.value) : ''
                      this.setState({ text, textPlaceholder: this.props.placeholder })
                    }
                  }
                }}
              />
            </Selector>
          }
        >
          <ItemList>
            {this.props.items.map((item, index) => {
              return (
                <Item
                  key={index}
                  onClick={() => {
                    this.props.onChange(item)
                    this.setState({ active: false, text: this.props.onItemLabel(item) })
                  }}
                >
                  {this.props.onItemRender(item, index)}
                </Item>
              )
            })}
          </ItemList>
        </Dropdown>
      </Root>
    )
  }
}
