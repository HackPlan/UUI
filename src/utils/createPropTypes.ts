import { UUIComponentFeaturePropTypes } from '../core/modules/UUIComponentPropTypes';
import PropTypes from 'prop-types';

export { PropTypes }

export function createComponentPropTypes<
  T extends { [key in string]: any }
>(data: UUIComponentFeaturePropTypes<T>) {
  return  data
}

function RecursiveShapeType<S, A extends string>(
  shape: S,
  childAttr: A,
  mapper = <X extends PropTypes.Requireable<PropTypes.InferProps<S>>>(shape: X) => PropTypes.arrayOf(shape),
) {
  const children = mapper(PropTypes.shape(shape));
  (shape as any)[childAttr] = children;
  const tagPropTypes = PropTypes.shape(shape);
  return tagPropTypes as PropTypes.Requireable<PropTypes.InferProps<S & { [key in A]: typeof children }>>
}

function NullableType(propType: any) {
  return (props: any, propName: any, ...rest: any) => props[propName] === null ? null : propType(props, propName, ...rest);
}

const NullType = PropTypes.oneOf([null])

export const ExtraPropTypes = {
  null: NullType,
  nullable: NullableType,
  recursiveShape: RecursiveShapeType,
}