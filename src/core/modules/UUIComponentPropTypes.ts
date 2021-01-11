import PropTypes from 'prop-types';

export type UUIComponentFeaturePropTypes<
  P,
> = { [key in keyof Required<P>]: any }

export const UUIConveniencePropTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export const UUIMetaPropTypes = {
  prefix: PropTypes.string,
  separator: PropTypes.string,
}

export const UUICustomizePropTypes = {
  customize: PropTypes.object,
}

export const UUICommonPropTypes = {
  ...UUIConveniencePropTypes,
  ...UUIMetaPropTypes,
  ...UUICustomizePropTypes,
}