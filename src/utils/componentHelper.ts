import React, { Children } from "react";

/**
 * Returns true if the given JSX element matches the given component type.
 *
 * NOTE: This function only checks equality of `displayName` for performance and
 * to tolerate multiple minor versions of a component being included in one
 * application bundle.
 * @param ComponentType desired component type of element
 * @param element JSX element in question
 */
// export function isElementOfType<P = {}>(ComponentType: React.ComponentType<P>, element: any): element is React.ComponentType<P> {
//   return (
//       element != null &&
//       element.type != null &&
//       element.type.displayName != null &&
//       element.type.displayName === ComponentType.displayName
//   );
// }

export function isElementOfType<P = {}>(ComponentType: React.ComponentType<P>, element: any): element is React.ReactElement<P> {
  return (
      element != null &&
      element.type != null &&
      element.type.displayName != null &&
      element.type.displayName === ComponentType.displayName
  );
}

export function getValidTypeChildren<P = {}>(ComponentType: React.ComponentType<P>, children: React.ReactNode) {
  return Children.toArray(children).filter((child): child is React.ReactElement<P> => isElementOfType(ComponentType, child))
}

