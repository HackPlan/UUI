export type NodeExtraStyles<T extends string> = {
  [key in T | 'root']?: React.CSSProperties
}

export interface ExtraStyleProps<T extends string> {
  overrideStyle?: NodeExtraStyles<T>
  extendStyle?: NodeExtraStyles<T>
}

export function getCompiledStyles<T extends string>(
  nodeName: string,
  initialStyle?: React.CSSProperties,
  options?: {
    overrideStyle?: NodeExtraStyles<T>,
    extendStyle?: NodeExtraStyles<T>,
  },
): React.CSSProperties {
  const keyName = nodeName === '' ? 'root' : nodeName;
  const override = (options && options.overrideStyle && (options.overrideStyle as any)[keyName]) || null
  const initial = initialStyle || null
  const extend = (options && options.extendStyle && (options.extendStyle as any)[keyName]) || null
  return override ? override : Object.assign(initial || {}, extend || {})
}