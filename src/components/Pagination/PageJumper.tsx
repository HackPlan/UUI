import React, { useMemo } from 'react';
import { StylishProps, initStylished } from '../../utils/stylish';
import { NumberField } from '../Input';

export enum PageJumperNodeName {
  PageJumper = "pagejumper",
  Root = "root",
  Input = "input"
}

export interface PageJumperProps extends StylishProps<PageJumperNodeName> {
  jumpPage: number | null
  onJumpPageChange: (page: number | null) => void
  onJumped: (page: number) => void
}

export function PageJumper(props: PageJumperProps) {

  // Initial Nodes
  const [
    Root,
    Input,
  ] = useMemo(() => {
    const stylished = initStylished(PageJumperNodeName.PageJumper, props, { prefix: "uui" })
    return [
      stylished.element('div', PageJumperNodeName.Root),
      stylished.element('div', PageJumperNodeName.Input),
    ]
  }, [])

  return (
    <Root className={"u-flex u-flex-row u-mx-2 u-items-center"}>
      <div className={"u-flex-no-wrap u-pr-1"}>Jump to</div>
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
}