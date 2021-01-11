import React from 'react';
import { UUIFunctionComponent, UUIFunctionComponentProps } from '../../core';
import { isString } from 'lodash-es';
import { createComponentPropTypes, PropTypes } from '../../utils/createPropTypes';

export type SvgrComponentProps = React.SVGAttributes<SVGElement>
export type SvgrComponent = React.StatelessComponent<SvgrComponentProps>

interface BaseIconFeatureProps {
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
export interface IconImageFeatureProps extends BaseIconFeatureProps {
  mode: 'image';
  source: string;
}
export interface IconSvgFeatureProps extends BaseIconFeatureProps {
  mode: 'svg';
  source: string | SvgrComponent;
  svgrProps?: SvgrComponentProps;
}
export interface IconAnyFeatureProps extends BaseIconFeatureProps {
  mode: 'any';
}
export type IconFeatureProps = IconImageFeatureProps | IconSvgFeatureProps | IconAnyFeatureProps

export const IconPropTypes = createComponentPropTypes<IconFeatureProps>({
  mode: PropTypes.oneOf(['image', 'svg', 'any']).isRequired,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element, PropTypes.func]),
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  svgrProps: PropTypes.any,
})

export const Icon = UUIFunctionComponent({
  name: 'Icon',
  nodes: {
    Root: 'div',
    Container: 'div',
  },
  propTypes: IconPropTypes,
}, (props: IconFeatureProps, { nodes }) => {
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
    <Root role="image">
      {content}
    </Root>
  )
})

export type IconProps = UUIFunctionComponentProps<typeof Icon>
