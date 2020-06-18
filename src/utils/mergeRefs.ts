/**
 * Codebase: https://github.com/smooth-code/react-merge-refs/blob/master/src/index.js
 */

export function mergeRefs(refs: any[]): (instance: unknown) => void {
  return (instance: any) => {
    refs.forEach((ref: any) => {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref != null) {
        ref.current = instance
      }
    })
  }
}