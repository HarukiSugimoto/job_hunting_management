import { adminApiClient, AdminApiGetPaths, SWR_PREFIX } from "@/external";
import useSWR from "swr";

const LIST_API_PATH: AdminApiGetPaths = '/mypage/create' as const;


export const useMyPageCreateMasterData = () => {
    const featchAll = async () => {
        try {
            const res = await adminApiClient.GET('/mypage/create');
            if (!res.response.ok) {
                throw new Error('Failed to fetch master data');
            } 
            return res.data;

        } catch (error) {
            throw new Error('Failed to fetch master data');
        }
    }

    const { data, isLoading, isValidating, mutate, error } = useSWR(
        [SWR_PREFIX, LIST_API_PATH],
        featchAll,
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
        results: data,
        isLoading,
        isValidating,
        mutate,
        error,
    };
}
