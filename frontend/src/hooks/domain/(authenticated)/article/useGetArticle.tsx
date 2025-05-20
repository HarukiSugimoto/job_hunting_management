import useSWR from 'swr';
import { adminApiClient, AdminApiPaths, SWR_PREFIX, AdminApiGetPaths } from '@/external';
import { useNotFound } from '@/hooks/common/useNotFound';

// eslint-disable-next-line @typescript-eslint/naming-convention
const TARGET_API_PATH: AdminApiGetPaths = '/articles/{article}' as const;
type TargetApiPath = typeof TARGET_API_PATH;

/**
 * リスト取得APIのPathのクエリパラメータ
 */
type Params = AdminApiPaths[TargetApiPath]['get']['parameters'];

/**
 * 記事詳細取得
 * @param articleId 記事ID
 * @returns 記事詳細
 */
export const useGetArticle = (params?: Params) => {
  const { notFound } = useNotFound();

  const fetcher = async () => {
    const res = params?.path.article
      ? await adminApiClient.GET(TARGET_API_PATH, {
          params,
        })
      : null;
    if (res?.response.status === 404) {
      return notFound();
    }
    if (res?.response.status !== 200) {
      throw new Error(`Failed to fetch article id ${params?.path.article}`);
    }
    return res.data;
  };
  const { data, isLoading, isValidating, mutate } = useSWR(
    // articleIdがない場合はfetchしない
    params?.path.article ? [SWR_PREFIX, TARGET_API_PATH, params] : null,
    fetcher,
    {
      // ブラウザのタブやウィンドウにフォーカスが戻ってきたときに再検証を行わない
      revalidateOnFocus: false,
      // ネットワーク接続が復旧したときに再検証を行わない
      revalidateOnReconnect: false,
      // 新データのロード中でも直前のデータ（前回取得した記事リスト）をそのまま表示し続ける
      keepPreviousData: true,
    }
  );

  return {
    /**
     * fetchしたデータ
     */
    article: data?.article,
    isLoading,
    isValidating,
    mutate,
  };
};
