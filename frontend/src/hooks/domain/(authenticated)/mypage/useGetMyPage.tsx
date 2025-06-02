import useSWR from 'swr';
import { adminApiClient, AdminApiPaths, SWR_PREFIX, AdminApiGetPaths } from '@/external';
import { useNotFound } from '@/hooks/common/useNotFound';

// eslint-disable-next-line @typescript-eslint/naming-convention
const TARGET_API_PATH: AdminApiGetPaths = '/mypage/{mypage}' as const;
type TargetApiPath = typeof TARGET_API_PATH;

/**
 * リスト取得APIのPathのクエリパラメータ
 */
type Params = AdminApiPaths[TargetApiPath]['get']['parameters'];

/**
 * MyPage詳細取得
 * @param myPageId MyPageID
 * @returns MyPage詳細
 */
export const useGetMyPage = (params?: Params) => {
  const { notFound } = useNotFound();

  const fetcher = async () => {
    const res = params?.path.mypage
      ? await adminApiClient.GET(TARGET_API_PATH, {
          params,
        })
      : null;
    if (res?.response.status === 404) {
      return notFound();
    }
    if (res?.response.status !== 200) {
      throw new Error(`Failed to fetch mypage id ${params?.path.mypage}`);
    }
    return res.data;
  };
  const { data, isLoading, isValidating, mutate } = useSWR(
    // articleIdがない場合はfetchしない
    params?.path.mypage ? [SWR_PREFIX, TARGET_API_PATH, params] : null,
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
    mypage: data?.data,
    isLoading,
    isValidating,
    mutate,
  };
};
