import React from 'react';
import { NumberField as UUINumberField } from '../Input';
import { UUI } from '../../utils/uui';


export interface BasePageJumperProps {
  /**
   * The target page to jump.
   */
  jumpPage: number | null;
  /**
   * Callback invokes when user change target page number
   */
  onJumpPageChange: (page: number | null) => void;
  /**
   * Callback invokes when user entered.
   */
  onJumped: (page: number) => void;
  /**
     *custom jumper label text.
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
  return (
    <Root>
      <Label>{props.labelText ? props.labelText : 'Jump to'}</Label>
      <NumberField
        customize={{
          Root: {
            extendStyle: { height: 34, width: 80 }
          }
        }}
        value={props.jumpPage}
        onChange={(value) => { props.onJumpPageChange(value) }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && props.jumpPage) {
            props.onJumped(props.jumpPage)
          }
        }}
      ></NumberField>
    </Root>
  )
})

export type PageJumperProps = Parameters<typeof PageJumper>[0]