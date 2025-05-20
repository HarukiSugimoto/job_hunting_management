import { isMatch } from 'lodash-es';
import { useSWRConfig } from 'swr';
import type { Key } from 'swr';
import { SWR_PREFIX, AdminApiGetPaths } from '@/external';

/**
 * 特定の path をキーに持つキャッシュを一括で削除 or 再フェッチするためのカスタム hook
 */
export const useClearSwrCacheByPath = () => {
  const { mutate } = useSWRConfig();

  /**
   * 指定した path をキーに持つキャッシュを一括で削除 or 再フェッチ
   *
   * @param targetPath - キャッシュキー配列の2番目に入っている path 文字列
   * @param matchParams - キャッシュキー配列の3番目に入っているオブジェクトと部分一致する場合に削除 undefined の場合は全て削除
   * @param revalidate  - true にすると削除後に再フェッチ、false なら削除のみ
   */
  const clearSwrCacheByPath = (
    targetPath: AdminApiGetPaths,
    matchParams?: Record<string, unknown>,
    revalidate = true
  ) => {
    mutate(
      (key: Key) =>
        // key が配列で、index=1 が targetPath に一致 かつ
        // matchParams を渡した場合は index=2 のオブジェクトと部分一致
        Array.isArray(key) &&
        key[0] === SWR_PREFIX &&
        isMatch(key, matchParams ? { 1: targetPath, 2: matchParams } : { 1: targetPath }),
      undefined,
      { revalidate }
    );
  };

  return { clearSwrCacheByPath };
};
