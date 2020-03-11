import classnames from 'classnames'

export type NodeExtraClassNames<T extends string> = {
  [key in T | 'root']?: string
}

export interface ExtraClassNameProps<T extends string> {
  prefixClassName?: string,
  overrideClassName?: NodeExtraClassNames<T>
  extendClassName?: NodeExtraClassNames<T>
}

export function getCompiledClassNames<T extends string>(
  nodeName: string,
  nodeClassName: string,
  initialClassName?: string,
  options?: {
    overrideClassName?: NodeExtraClassNames<T>,
    extendClassName?: NodeExtraClassNames<T>,
  },
) {
  const keyName = nodeName === '' ? 'root' : nodeName;
  const override = (options && options.overrideClassName && (options.overrideClassName as any)[keyName]) || null
  const extend = (options && options.extendClassName && (options.extendClassName as any)[keyName]) || null
  return override ? override : classnames(nodeClassName, initialClassName || '', extend || '')
}