/**
 * オブジェクトが持つnumberやbooleanのvalueをstring型へ変換しつつURLSearchParamsを生成するメソッド
 */
export const convertObjectToSearchParams = (obj: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'number' || typeof value === 'boolean') {
      searchParams.append(key, value.toString());
    } else if (typeof value === 'string') {
      searchParams.append(key, value);
    }
  });

  return searchParams;
};
