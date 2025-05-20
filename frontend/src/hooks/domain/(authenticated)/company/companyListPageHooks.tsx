import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { AdminApiGetPaths, AdminApiPaths, adminApiClient, SWR_PREFIX } from '@/external';
import { usePaginationUrlParams } from '@/hooks/common/usePaginationUrlParams';
import type { AllowEmptyShallow } from '@/lib/ArrowEmptyShallow';
import { convertObjectToSearchParams } from '@/lib/convertObjectToSearchParams';
import { PER_PAGE_OPTIONS } from '@/sakura-like-ui/constants/common';

/**
 * リスト取得APIのPath
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const LIST_API_PATH: AdminApiGetPaths = '/company' as const;
type ListApiPath = typeof LIST_API_PATH;

/**
 * リスト取得APIのPathのクエリパラメータ
 */
type QueryParams = NonNullable<Required<AdminApiPaths[ListApiPath]['get']['parameters']['query']>>;

/**
 * リスト取得APIのPathのクエリパラメータのうち、検索フォームに必要なもの
 */
type SearchQueryParams = AllowEmptyShallow<Omit<QueryParams, 'page' | 'par_page'>>;

/**
 * リストページを表示している実際のURL
 * 検索フォームの遷移先URLに利用
 */
const frontPagePath = '/companys' as const;

/**
 * URLのクエリパラメータを取得するhook
 */
const useCurrentUrlParamsQuery = () => {
  const [urlParams] = useSearchParams();
  const { page, parPage } = usePaginationUrlParams();

  const currentQuery: QueryParams = {
    word: urlParams.get('word'),
    page: page,
    par_page: parPage,
  } as QueryParams;

  return {
    currentQuery,
  };
};

/**
 * 記事一覧ページで使用する記事一覧の取得を行うhook
 * 内部でURLのクエリパラメータを取得し、APIのクエリパラメータに変換している
 */
export const useCompanyListData = () => {
  const { currentQuery } = useCurrentUrlParamsQuery();

  const fetcher = async () => {
    const res = await adminApiClient.GET(LIST_API_PATH, {
      params: {
        query: currentQuery,
      },
    });
    if (res.response.status !== 200) {
      throw new Error('Failed to fetch companys');
    }
    return res.data;
  };

  const { data, isLoading, isValidating, mutate, error } = useSWR(
    [SWR_PREFIX, LIST_API_PATH, currentQuery],
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
    results: data,
    isLoading,
    isValidating,
    mutate,
    error,
  };
};

/**
 * リストページで使用する記事検索フォームの制御を行うhook
 */
export const useCompanySearchForm = () => {
  const { currentQuery } = useCurrentUrlParamsQuery();

  const navigate = useNavigate();
  const searchForm = useForm<SearchQueryParams>({
    defaultValues: {
      word: currentQuery?.word || '',
    },
  });

  const submitForm = searchForm.handleSubmit(async (data) => {
    const params = new URLSearchParams(convertObjectToSearchParams(data));
    if (currentQuery?.par_page && currentQuery?.par_page !== PER_PAGE_OPTIONS[0]) {
      params.set('par_page', currentQuery?.par_page.toString());
    }
    navigate(`${frontPagePath}?${params.toString()}`);
  });

  const resetForm = () => {
    const params = new URLSearchParams();
    // par_pageがデフォルト以外だったら、URLに追加する
    if (currentQuery?.par_page && currentQuery?.par_page !== PER_PAGE_OPTIONS[0]) {
      params.append('par_page', currentQuery?.par_page.toString());
    }
    navigate(`${frontPagePath}?${params.toString()}`);
  };
  return {
    /**
     * 検索フォーム制御用のreact-hook-formのuseForm
     */
    searchForm,
    /**
     * 検索フォームをsubmitした、URLへ遷移する
     */
    submitForm,
    /**
     * 検索フォームをリセットした、URLへ遷移する
     */
    resetForm,
  };
};
