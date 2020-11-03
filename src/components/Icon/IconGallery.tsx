import React from "react"
import { Icon, IconProps, IconImageFeatureProps, IconSvgFeatureProps, IconAnyFeatureProps, IconFeatureProps } from "./Icon"
import { mapValues } from "lodash-es"

export type LoadedIcon<T> = (props: Omit<IconProps, 'mode' | 'source'> & Omit<T, 'mode' | 'source'>) => JSX.Element

type LoadedIconByMode<T extends IconProps['mode'] | undefined> =
  T extends 'image' ? LoadedIcon<IconImageFeatureProps> : (
  T extends 'svg' ? LoadedIcon<IconSvgFeatureProps> : (
  T extends 'any' ? LoadedIcon<IconAnyFeatureProps> : undefined
  ))


export type IconGalleryOptions<M extends IconProps['mode'] | undefined>  = Partial<Pick<IconFeatureProps, 'height' | 'width'>> & { mode?: M }
export function IconGallery<
  N extends string,
  P extends {
    [key in N]: Partial<Pick<IconProps, 'mode'>> & Pick<IconProps, 'source'>
  },
  M extends IconProps['mode'] | undefined,
  O extends IconGalleryOptions<M>,
  V extends {
    [key in keyof P]: LoadedIconByMode<P[key]['mode']> extends undefined
      ? (O extends undefined
          ? never
          : (LoadedIconByMode<O['mode']> extends undefined ? never : LoadedIconByMode<O['mode']>)
        )
      : LoadedIconByMode<P[key]['mode']>
  }
>(initials: P, options?: O): V {
  return mapValues(initials, (value) => {
    return (props: IconProps) => {
      const finalProps = {
        ...options,
        ...props,
        ...value,
        mode: value.mode || (options && options.mode)
      } as any
      return <Icon {...finalProps}></Icon>
    }
  }) as any
}
