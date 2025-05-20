/**
 * URLSearchParams から指定キーの値を取り出し、
 * 空文字・null・NaN を全て undefined にマッピングした上で number を返す
 */
export const getNumberQueryParam = (params: URLSearchParams, key: string): number | null => {
  const raw = params.get(key);
  if (raw === null || raw.trim() === '') {
    return null;
  }

  const num = Number(raw);
  return Number.isNaN(num) ? null : num;
};
