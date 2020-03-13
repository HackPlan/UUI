import React from 'react';
import { StylishProps, initStylished, initStylishedProxy } from '../../utils/stylish';
import { BaseButtonProps, BaseButton } from '../../base/BaseButton';

export interface ButtonProps extends BaseButtonProps {
}

export function Button(props: BaseButtonProps) {
  const ButtonProxy = initStylishedProxy(BaseButton, props)
  return (
    <ButtonProxy
      {...props}
      extendClassName={{ root: 'test1' }}
      extendStyle={{ root: { backgroundColor: 'red', borderRadius: 2 }}}
      extendChildrenBefore={{ root: <div>extend1</div>}}
    />
  )
}