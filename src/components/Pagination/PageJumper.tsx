import React, { useContext, useState } from 'react';
import { NumberField as UUINumberField } from '../Input';
import { UUI } from '../../utils/uui';
import { PaginationContext } from './Pagination';

export interface BasePageJumperProps {
  /**
   * Custom jumper label text.
   */
  labelText?: string;
}

export const PageJumper = UUI.FunctionComponent({
  name: 'PageJumper',
  nodes: {
    Root: 'div',
    Label: 'div',
    NumberField: UUINumberField,
  }
}, (props: BasePageJumperProps, nodes) => {
  const { Root, Label, NumberField } = nodes

  const pagination = useContext(PaginationContext)
  if (!pagination) {
    console.warn('[UUI] please use <PageJumper> in <Pagination>')
    return <></>
  }

  const [inputValue, setInputValue] = useState<number | null>(null)

  return (
    <Root>
      <Label>{props.labelText ? props.labelText : 'Jump to'}</Label>
      <NumberField
        customize={{
          Root: {
            extendStyle: { height: 34, width: 80 }
          }
        }}
        min={1}
        value={inputValue}
        onChange={(value) => { setInputValue(value) }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && inputValue !== null && inputValue !== undefined) {
            pagination.toNthPage(inputValue)
          }
        }}
      ></NumberField>
    </Root>
  )
})

export type PageJumperProps = Parameters<typeof PageJumper>[0]