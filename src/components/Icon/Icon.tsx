import React from 'react';
import { UUI } from '../../core/uui';
import { isString } from 'lodash';

export type SvgrComponentProps = React.SVGAttributes<SVGElement>
export type SvgrComponent = React.StatelessComponent<SvgrComponentProps>

interface BaseIconProps {
  /**
   * Icon render mode.
   */
  mode: 'image' | 'svg' | 'any';
  /**
   * The source data of Icon.
   */
  source: string | SvgrComponent | React.ReactNode;
  /**
   * alternative text description of the icon image.
   */
  alt?: string;
  /**
   * Width(px) of icon.
   * @default 24px
   */
  width?: number;
  /**
   * Height(px) of icon.
   * @default 24px
   */
  height?: number;
}
export interface IconImageProps extends BaseIconProps {
  mode: 'image';
  source: string;
}
export interface IconSvgProps extends BaseIconProps {
  mode: 'svg';
  source: string | SvgrComponent;
  svgrProps?: SvgrComponentProps;
}
export interface IconAnyProps extends BaseIconProps {
  mode: 'any';
}
export type IconFeatureProps = IconImageProps | IconSvgProps | IconAnyProps

export const Icon = UUI.FunctionComponent({
  name: 'Icon',
  nodes: {
    Root: 'div',
    Container: 'div',
  }
}, (props: IconFeatureProps, nodes) => {
  const { Root, Container } = nodes

  const finalProps = {
    width: props.width || 24,
    height: props.height || 24,
  }

  const content = (() => {
    const size = { width: finalProps.width, height: finalProps.height }
    switch (props.mode) {
      case 'image':
        return (
          <Container>
            <img src={props.source} alt={props.alt} style={{ ...size }} />
          </Container>
        )
      case 'svg':
        if (isString(props.source)) {
          return <Container><img src={props.source} alt={props.alt} style={{ ...size }} /></Container>
        } else {
          return <Container><props.source {...props.svgrProps} {...size} /></Container>
        }
      case 'any':
        return <Container>{props.source}</Container>
    }
  })()

  return (
    <Root>
      {content}
    </Root>
  )
})

export type IconProps = Parameters<typeof Icon>[0]
