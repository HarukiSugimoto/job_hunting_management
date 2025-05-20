// Generated from SakuraLikeUI v0.1.2 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLPagination)

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Skeleton,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-restricted-imports
import { PER_PAGE_OPTIONS } from '../../../constants/common';

export interface SLPaginationProps {
  /**
   * 現在のページ
   * 渡さなければurl paramから取得
   */
  page?: number;
  /**
   * 1ページあたりの表示件数
   * 渡さなければurl paramから取得
   */
  rowsPerPage?: number;
  /**
   * url paramのpageのクエリキー
   * 渡さなければデフォルトのpageを使用
   */
  pageParamName?: string;
  /**
   * url paramのpar_pageのクエリキー
   * 渡さなければデフォルトのpar_pageを使用
   */
  rowsPerPageParamName?: string;
  /**
   * 1ページあたりの表示件数の選択肢
   * 渡さなければデフォルトを使用
   */
  rowsPerPageOptions?: number[];
  /**
   * 現在の表示しているデータの表示件数
   */
  totalCount?: number;

  /**
   * 表示件数選択肢を非表示にするか
   * デフォルトはfalse
   */
  hideRowsPerPageSelect?: boolean;

  /**
   * ページネーションのリンクをクリックしたときに呼ばれる関数
   */
  onPaginationLinkClick?: () => void;

  /**
   * ルート Box のスタイルを上書き／追加したいときに使います
   */
  sx?: SxProps<Theme>;
}

export const SLPagination: React.FC<SLPaginationProps> = (props) => {
  const [searchParams] = useSearchParams();

  // props から各値を取得（デフォルト値含む）
  const pageParamName = props.pageParamName ?? 'page';
  const rowsPerPageParamName = props.rowsPerPageParamName ?? 'par_page';
  const defaultRowsPerPage = props.rowsPerPageOptions?.[0] ?? PER_PAGE_OPTIONS[0];

  // URLから取得（1ベース）
  const urlPage = searchParams.get(pageParamName) ? Number(searchParams.get(pageParamName)) - 1 : 0;
  const urlRows = searchParams.get(rowsPerPageParamName)
    ? Number(searchParams.get(rowsPerPageParamName))
    : defaultRowsPerPage;

  const page = props.page ?? urlPage;
  const rowsPerPage = props.rowsPerPage ?? urlRows;
  const options = props.rowsPerPageOptions ?? PER_PAGE_OPTIONS;
  const totalPages = props.totalCount ? Math.ceil(props.totalCount / rowsPerPage) : 0;

  // クエリ文字列組み立て
  const buildQuery = (newParams: Record<string, string | undefined>) => {
    const qp = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (!val) qp.delete(key);
      else qp.set(key, val);
    });
    const query = qp.toString();
    return query ? `?${query}` : '';
  };

  // ローディング中表示：Skeletonを使ってリッチに
  if (props.totalCount === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...props.sx,
        }}
      >
        {/* Pagination Skeleton */}
        <Skeleton height={28} variant="rectangular" width="60%" />
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, ...props.sx }}
    >
      <Pagination
        count={totalPages}
        page={page + 1}
        renderItem={(item) => {
          const to = buildQuery({
            [pageParamName]: item.page && item.page !== 1 ? String(item.page) : undefined,
            [rowsPerPageParamName]:
              rowsPerPage !== defaultRowsPerPage ? String(rowsPerPage) : undefined,
          });
          // 現在のページ番号はリンク化しない
          if (item.page === page + 1) {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <PaginationItem sx={{ cursor: 'default' }} {...item} />;
          }

          return (
            <Link
              style={{ textDecoration: 'none' }}
              to={to}
              onClick={() => {
                props.onPaginationLinkClick?.();
              }}
            >
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <PaginationItem {...item} />
            </Link>
          );
        }}
        shape="rounded"
        size="small"
      />
      {!props.hideRowsPerPageSelect && (
        <FormControl size="small" sx={{ width: 'auto', minWidth: 80 }} variant="outlined">
          <InputLabel size="small">表示件数</InputLabel>
          <Select
            label="表示件数"
            size="small"
            sx={{ width: 'auto', minWidth: 80 }}
            value={String(rowsPerPage)}

            // リンク化しているためonChange不要
          >
            {options.map((opt) => (
              <MenuItem
                key={opt}
                sx={{ padding: 0 }}
                value={opt}
                onClick={() => {
                  props.onPaginationLinkClick?.();
                }}
              >
                <Box
                  component={Link}
                  sx={{ textDecoration: 'none', color: 'inherit', px: '16px', py: '6px' }}
                  to={buildQuery({
                    [rowsPerPageParamName]: String(opt),
                    // pageは1に戻す
                    [pageParamName]: '1',
                  })}
                >
                  {opt}件
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};
