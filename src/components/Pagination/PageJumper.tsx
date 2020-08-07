import React, { useContext, useState, useEffect } from 'react';
import { NumberField as UUINumberField } from '../Input';
import { UUI } from '../../core/uui';
import { PaginationContext } from './PaginationContext';

export interface PageJumperFeatureProps {
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
}, (props: PageJumperFeatureProps, nodes) => {
  const { Root, Label, NumberField } = nodes

  const context = useContext(PaginationContext)
  if (!context) {
    console.warn('[UUI] please use <PageJumper> in <Pagination>')
    return <></>
  }
  const { pagination, loading } = context

  useEffect(() => {
    setInputValue(null)
  }, [pagination.currentPage])

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
        disabled={loading}
        placeholder={`${pagination.currentPage}`}
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