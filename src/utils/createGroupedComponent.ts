export function createGroupedComponent<
  M extends any,
  K extends string | number,
  X extends any,
  P extends { [key in K]: X },
>(MainComponent: M, SubComponents: P) {
  for (const [key, sub] of Object.entries(SubComponents)) {
    (MainComponent as any)[key] = sub
  }
  return MainComponent as M & P
}