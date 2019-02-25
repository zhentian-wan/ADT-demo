// propOr :: (string, string) -> Obj -> a
export const propOr = (propName = '', defVal = undefined) => (obj) =>
  obj[propName] != null ? obj[propName]: defVal;