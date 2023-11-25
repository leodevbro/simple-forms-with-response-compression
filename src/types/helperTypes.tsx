export const doNothing = (): null => null;

export type CheckThatAllKeysAreTheSameTypeAsValues<
  ObjEnumType extends {
    [KeyType in keyof ObjEnumType]: KeyType;
  },
> = null;

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;
