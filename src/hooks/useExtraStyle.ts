export type NodeExtraStyles<T extends string> = {
  [key in T | 'root']?: React.CSSProperties
}

export interface ExtraStyleProps<T extends string> {
  overrideStyle?: NodeExtraStyles<T>
  extendStyle?: NodeExtraStyles<T>
}

export function getCompiledStyles<T extends string>(
  nodeName: string,
  styles?: {
    overrideStyle?: NodeExtraStyles<T>,
    extendStyle?: NodeExtraStyles<T>,
    initialStyle?: NodeExtraStyles<T>,
  },
) {
  const keyName = nodeName === '' ? 'root' : nodeName;
  const override = (styles && styles.overrideStyle && (styles.overrideStyle as any)[keyName]) || null
  const initial = (styles && styles.initialStyle && (styles.initialStyle as any)[keyName]) || null
  const extend = (styles && styles.extendStyle && (styles.extendStyle as any)[keyName]) || null
  return override ? override : Object.assign(initial || {}, extend || {})
}