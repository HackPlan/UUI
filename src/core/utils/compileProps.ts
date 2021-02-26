import { clone, pickBy, mapKeys, isEmpty } from "lodash-es";
import classNames from "classnames";

export function compileProps(props: any, ref?: any): any {
  const compiledProps = clone(props)
  if (!compiledProps.customize) {
    compiledProps.customize = {}
  }

  const rootCustomizeProps: any = (compiledProps.customize as any)['Root'] || {};
  /**
   * Convenience props: className, style
   * `className` will be injected into customize.Root { extendClassName: ... }
   * `style` will be injected into customize.Root { extendStyle: ... }
   * `id` will be injected into customize.Root { overrideId: ... }
   * `data-*` will be injected into customize.Root { dataAttributes: ... }
   * `aria-*` will be injected into customize.Root { ariaAttributes: ... }
   */
  if (compiledProps.className) rootCustomizeProps.extendClassName = classNames(compiledProps.className, rootCustomizeProps.extendClassName);
  if (compiledProps.style) rootCustomizeProps.extendStyle = Object.assign(compiledProps.style, rootCustomizeProps.extendStyle);
  if (compiledProps.id) rootCustomizeProps.overrideId = compiledProps.id;
  if (ref) rootCustomizeProps.ref = ref;

  let dataAttributes = pickBy(compiledProps, (v, k) => k.startsWith('data-'))
  dataAttributes = mapKeys(dataAttributes, (v, k) => k.replace('data-', ''))
  if (!isEmpty(dataAttributes)) {
    rootCustomizeProps.dataAttributes = Object.assign(dataAttributes, rootCustomizeProps.dataAttributes);
  }

  let ariaAttributes = pickBy(compiledProps, (v, k) => k.startsWith('aria-'))
  ariaAttributes = mapKeys(ariaAttributes, (v, k) => k.replace('aria-', ''))
  if (!isEmpty(ariaAttributes)) {
    rootCustomizeProps.ariaAttributes = Object.assign(ariaAttributes, rootCustomizeProps.ariaAttributes);
  }

  /**
   * set undefined if customize is empty
   */

  if (!isEmpty(rootCustomizeProps)) {
    (compiledProps.customize as any)['Root'] = rootCustomizeProps;
  }
  if (isEmpty(compiledProps.customize)) {
    compiledProps.customize = undefined;
  }

  compiledProps.ref = ref;

  return compiledProps
}