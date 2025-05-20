import { useSearchParams } from 'react-router-dom';
import { PER_PAGE_OPTIONS } from '@/sakura-like-ui/constants/common';

/**
 * pageの不適切な値や空の値は全て1へ変換する
 * @param {unknown} value - 不定の値
 * @return {(typeof PAR_PAGES)[number]} par pageの数
 */
const validatePageParam = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  } else if (value && typeof value === 'string') {
    return parseInt(value, 10);
  }
  return 1;
};

/**
 * par pageの不適切な値や空の値は全てデフォルト値へ変換する
 * @param {unknown} value - 不定の値
 * @return {(typeof PAR_PAGES)[number]} par pageの数
 */
const validateParPageParam = (value: unknown): (typeof PER_PAGE_OPTIONS)[number] => {
  if (PER_PAGE_OPTIONS.some((num) => num === Number(value))) {
    return Number(value) as (typeof PER_PAGE_OPTIONS)[number];
  }
  return PER_PAGE_OPTIONS[0];
};

/**
 * urlParamsからページネーションの値を取得するhook
 */
export const usePaginationUrlParams = (options?: {
  /**
   * url paramのpageのクエリキー
   * 渡さなければデフォルトのpageを使用
   */
  pageKey?: string;
  /**
   * url paramのpar_pageのクエリキー
   * 渡さなければデフォルトのpar_pageを使用
   */
  parPageKey?: string;
}) => {
  const [urlParams] = useSearchParams();

  // optionsがundefinedでも {} を代入 ⇒ destructuring でデフォルトが効く
  const { pageKey = 'page', parPageKey = 'par_page' } = options ?? {};

  // page
  const pageQuery = urlParams.get(pageKey);
  const page = validatePageParam(pageQuery);

  // par_page
  const parPageQuery = urlParams.get(parPageKey);
  const parPage = validateParPageParam(parPageQuery);

  return {
    /**
     * 現在のページ
     */
    page,
    /**
     * 一ページの表示数
     */
    parPage,
  };
};
