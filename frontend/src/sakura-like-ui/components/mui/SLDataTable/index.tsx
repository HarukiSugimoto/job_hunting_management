// Generated from SakuraLikeUI v0.1.2 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/components/mui/SLDataTable)

import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import type { Breakpoint } from '@mui/material';
import type React from 'react';

import { useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { SKELETON_ITEM_COUNT } from '../../../constants/common';

/**
 * ソートの方向
 */
type SortDirection = 'asc' | 'desc';

/**
 * テーブルのカラム
 */
export interface SLDataTableColumn<T> {
  /**
   * カラムのID
   */
  id: string;
  /**
   * カラムのラベル
   */
  label: string;
  /**
   * カラムの表示内容
   */
  render: (item: T) => React.ReactNode;
  /**
   * そのカラムがソート可能か
   */
  sortable?: boolean;
  /**
   * カラムの幅
   */
  width?: string | number | Partial<Record<Breakpoint, string | number>>;
  /**
   * カラムの表示内容をモバイルで変更する場合の指定
   */
  mobileRender?: (item: T) => React.ReactNode;
  /**
   * スマホ表示時のカラムのラベル
   * なければlabelを使用
   */
  mobileLabel?: string;
  /**
   * スマホ表示時に項目の表示順を決める
   */
  mobileOrder?: number;
}

export interface SLDataTableProps<T> {
  data?: T[];
  totalCount: number;
  columns: SLDataTableColumn<T>[];
  /**
   * ループ表示に必要な一意のキーを生成する処理
   */
  keyExtractor: (item: T) => string;
  defaultSortField?: string;
  defaultSortDirection?: SortDirection;
  onSort?: (field: string, direction: SortDirection) => void;
  emptyMessage?: string;
  rowsPerPageOptions?: number[];
  /**
   * ローディング中かどうか
   */
  isLoading?: boolean;
}

export const SLDataTable = <T,>(props: SLDataTableProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortField, setSortField] = useState<string | undefined>(props.defaultSortField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    props.defaultSortDirection ?? 'desc'
  );

  // Handle sort changes
  const handleSort = (field: string) => {
    if (props.onSort) {
      if (sortField === field) {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        props.onSort(field, newDirection);
      } else {
        setSortField(field);
        setSortDirection('asc');
        props.onSort(field, 'asc');
      }
    }
  };

  // Render sort icon
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  // Render mobile card view
  const renderMobileCard = (item: T) => {
    const mobileColumns = [...props.columns].sort((a, b) => {
      const aOrder = a.mobileOrder ?? 999;
      const bOrder = b.mobileOrder ?? 999;
      return aOrder - bOrder;
    });

    return (
      <Card key={props.keyExtractor(item)} sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            {mobileColumns.map((column) => {
              if (column.mobileOrder === -1) return null;
              const content = column.mobileRender ? column.mobileRender(item) : column.render(item);
              return (
                <Grid key={`${props.keyExtractor(item)}${column.id}`} size={{ xs: 12 }}>
                  {column.mobileLabel && (
                    <Typography color="text.secondary" variant="caption">
                      {column.mobileLabel}:
                    </Typography>
                  )}
                  {typeof content === 'string' || typeof content === 'number' ? (
                    <Typography variant={column.mobileLabel ? 'body2' : 'body1'}>
                      {content}
                    </Typography>
                  ) : (
                    content
                  )}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Table skeleton loader
  const TableSkeleton = () => (
    <TableContainer>
      <Table size="small" sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell key={column.id} sx={{ width: column.width }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
          {Array.from(new Array(SKELETON_ITEM_COUNT)).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              {props.columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton
                    height={
                      column.id.includes('image') || column.id.includes('thumbnail') ? 60 : 24
                    }
                    variant={
                      column.id.includes('image') || column.id.includes('thumbnail')
                        ? 'rectangular'
                        : 'text'
                    }
                    width={
                      column.id.includes('image') || column.id.includes('thumbnail') ? 80 : '80%'
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Mobile skeleton loader
  const CardSkeleton = () => (
    <Box sx={{ p: 2 }}>
      {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
      {Array.from(new Array(SKELETON_ITEM_COUNT)).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              {props.columns
                .filter((col) => col.mobileOrder !== -1)
                .map((column) => (
                  <Grid key={column.id} size={{ xs: 12 }}>
                    {column.mobileLabel && <Skeleton height={20} sx={{ mb: 0.5 }} width={100} />}
                    <Skeleton
                      height={
                        column.id.includes('image') || column.id.includes('thumbnail') ? 60 : 24
                      }
                      variant={
                        column.id.includes('image') || column.id.includes('thumbnail')
                          ? 'rectangular'
                          : 'text'
                      }
                      width={
                        column.id.includes('image') || column.id.includes('thumbnail') ? 80 : '100%'
                      }
                    />
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  // Empty state
  const EmptyState = () => (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography color="text.secondary" variant="body1">
        {props.emptyMessage}
      </Typography>
    </Box>
  );

  // ローディングオーバーレイを表示するかどうか
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const showOverlay = props.isLoading && props.data !== undefined;

  return (
    <Box sx={{ position: 'relative' }}>
      {typeof props.data === 'undefined' ? (
        isMobile ? (
          <CardSkeleton />
        ) : (
          <TableSkeleton />
        )
      ) : props.data.length === 0 ? (
        <EmptyState />
      ) : isMobile ? (
        <Box sx={{ p: 2 }}>{props.data.map(renderMobileCard)}</Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {props.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ cursor: column.sortable ? 'pointer' : 'default', width: column.width }}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {column.label} {column.sortable && renderSortIcon(column.id)}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((item) => (
                <TableRow key={props.keyExtractor(item)}>
                  {props.columns.map((column) => (
                    <TableCell key={column.id}>{column.render(item)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {showOverlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'var(--mui-palette-background-paper)',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
