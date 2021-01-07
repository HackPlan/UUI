import { UUIComponentFeaturePropTypes } from '../core/modules/UUIComponentPropTypes';
import PropTypes from 'prop-types';

export { PropTypes }

export function createComponentPropTypes<
  T extends { [key in string]: any }
>(data: UUIComponentFeaturePropTypes<T>) {
  return  data
}
