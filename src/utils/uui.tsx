import React, { Ref, PropsWithChildren } from 'react';
import { ExtraClassNameProps } from './extraClassName';
import { ExtraStyleProps } from './extraStyle';
import { ExtraChildrenProps } from './extraChildren';
import { initStylished } from './stylish';

export type StylishProps<T extends string> = ExtraClassNameProps<T> & ExtraStyleProps<T> & ExtraChildrenProps<T>
export type NodesCallback<T> = { [key: string]: React.ForwardRefExoticComponent<React.PropsWithoutRef<T> & React.RefAttributes<T>> }
export class UUI {
  static Component<T, P, X extends NodesCallback<T>>(
    options: {
      prefix: string,
      name: string
      separator?: string,
      nodes: (stylished: ReturnType<typeof initStylished>) => X
    },
    _Component: <T, P, X>(
      props: PropsWithChildren<P> & StylishProps<Extract<keyof X, string>>,
      ref: Ref<T>,
      Nodes: any
    ) => React.ReactElement
  ) {
    return React.forwardRef((props: PropsWithChildren<P> & StylishProps<Extract<keyof X, string>>, ref: Ref<T>) => {
      const stylished = initStylished(options.name, props, { prefix: "uui" })
      return _Component(props, ref, options.nodes(stylished))
    })
  }
}
