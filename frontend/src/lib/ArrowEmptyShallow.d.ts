/**
 * react hook formのdefaultValuesに渡すときに、空文字を許可するときに使用する
 */
export type AllowEmptyShallow<T> = {
  [K in keyof T]: T[K] | '';
};
