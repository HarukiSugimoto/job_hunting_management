import useSWR from 'swr';
import { adminApiClient, AdminApiPaths, SWR_PREFIX, AdminApiGetPaths } from '@/external';
import { useNotFound } from '@/hooks/common/useNotFound';

// eslint-disable-next-line @typescript-eslint/naming-convention
const TARGET_API_PATH: AdminApiGetPaths = '/company/{company}' as const;
type TargetApiPath = typeof TARGET_API_PATH;

/**
 * リスト取得APIのPathのクエリパラメータ
 */
type Params = AdminApiPaths[TargetApiPath]['get']['parameters'];

/**
 * 会社詳細取得
 * @param articleId 会社ID
 * @returns 会社詳細
 */
export const useGetCompany = (params?: Params) => {
  const { notFound } = useNotFound();

  const fetcher = async () => {
    const res = params?.path.company
      ? await adminApiClient.GET(TARGET_API_PATH, {
          params,
        })
      : null;
    if (res?.response.status === 404) {
      return notFound();
    }
    if (res?.response.status !== 200) {
      throw new Error(`Failed to fetch article id ${params?.path.company}`);
    }
    return res.data;
  };
  const { data, isLoading, isValidating, mutate } = useSWR(
    // articleIdがない場合はfetchしない
    params?.path.company ? [SWR_PREFIX, TARGET_API_PATH, params] : null,
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
    company: data?.data,
    isLoading,
    isValidating,
    mutate,
  };
};
