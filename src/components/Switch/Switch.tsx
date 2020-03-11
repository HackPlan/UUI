import React, { useRef } from 'react'
import { ExtraClassNameProps, ExtraStyleProps, initStylish } from '../../utils/stylish';
import RcSwitch from 'rc-switch';
import { omit } from 'lodash';
import classnames from 'classnames';

import './Switch.less'

export enum SwitchNodeName {
  Root = "switch",
  Checkbox = "checkbox",
  Indicator = "indicator",
}

export type SwitchSize = 'small' | 'default';

export interface SwitchProps extends ExtraClassNameProps<SwitchNodeName>, ExtraStyleProps<SwitchNodeName> {
  size?: SwitchSize;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  title?: string;
  children?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  value: boolean
  onChange: (flag: boolean) => void
}

export function Switch(props: SwitchProps) {
  const prefixCls = 'uui-switch'
  const getStylishProps = initStylish<SwitchNodeName>(SwitchNodeName.Root, props, { prefix: "uui" });
  const { disabled, loading } = props
  const size = props.size || 'default'
  const children = props.children || (<div></div>)
  const rcSwitch = useRef(null)

  const loadingIcon = loading ? (
    <div style={{ width: 4, height: 4 }}>i</div> // TODO: fill real loading icon
  ) : null;

  const classNames = classnames({
    [`${prefixCls}-small`]: size === 'small',
    [`${prefixCls}-loading`]: loading,
  });

  return (
    <RcSwitch
      {...omit(props, ['loading', 'extendClassName', 'extendStyle', 'overrideClassName', 'overrideStyle'])}
      {...getStylishProps('', [
        classNames
      ])}
      checkedChildren={children}
      unCheckedChildren={children}
      checked={props.value}
      prefixCls={prefixCls}
      disabled={disabled || loading}
      ref={rcSwitch}
      loadingIcon={loadingIcon}
    />
  )
}
