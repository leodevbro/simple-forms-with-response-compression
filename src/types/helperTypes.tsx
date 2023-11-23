export const doNothing = (): null => null;

export type CheckThatAllKeysAreTheSameTypeAsValues<
  ObjEnumType extends {
    [KeyType in keyof ObjEnumType]: KeyType;
  },
> = null;
