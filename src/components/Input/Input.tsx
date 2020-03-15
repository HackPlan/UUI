import React, { useMemo } from 'react';
import { initStylishedProxy } from '../../utils/stylish';
import { BaseInputProps, BaseInput } from '../../base/BaseInput';
import classNames from 'classnames';

import './Input.scss';
import { omit } from 'lodash';

export interface InputProps extends BaseInputProps {
}

export function Input(props: InputProps) {
  const InputProxy = useMemo(() => initStylishedProxy(BaseInput, props), [])
  return (
    <InputProxy
      {...omit(props)}
      extendClassName={{
        root: classNames([
          'input',
        ])
      }}
    />
  )
}