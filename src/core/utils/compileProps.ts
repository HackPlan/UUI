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
   * className will be injected into customize.Root { extendClassName: ... }
   * style will be injected into customize.Root { extendStyle: ... }
   * id will be injected into customize.Root { id: ... }
   */
  if (compiledProps.className) rootCustomizeProps.extendClassName = classNames(compiledProps.className, rootCustomizeProps.extendClassName);
  if (compiledProps.style) rootCustomizeProps.extendStyle = Object.assign(compiledProps.style, rootCustomizeProps.extendStyle);
  if (compiledProps.id) rootCustomizeProps.id = compiledProps.id;

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

  if (!isEmpty(rootCustomizeProps)) {
    (compiledProps.customize as any)['Root'] = rootCustomizeProps;
  }
  if (isEmpty(compiledProps.customize)) {
    compiledProps.customize = undefined;
  }

  compiledProps.ref = ref;

  return compiledProps
}