import { Box, Button, Card, Chip } from '@mui/material';
import type React from 'react';

import { Link } from 'react-router-dom';

import { AdminApiComponents } from '@/external';
import { SLDataList } from '@/sakura-like-ui/components/mui/SLDataList';
import type { SLDataTableColumn } from '@/sakura-like-ui/components/mui/SLDataTable';

const statusConfig = {
  published: { label: '公開中', color: 'success' },
  private: { label: '非公開', color: 'default' },
  pending: { label: 'レビュー待ち', color: 'warning' },
  draft: { label: '下書き', color: 'info' },
} as const;

const columns: SLDataTableColumn<AdminApiComponents['schemas']['ArticleSimpleResource']>[] = [
  {
    id: 'id',
    label: 'ID',
    render: (article) => article.id,
    sortable: true,
    mobileLabel: 'ID',
    mobileOrder: 2,
    width: 60,
  },
  {
    id: 'thumbnail',
    label: 'サムネイル',
    width: '20%',
    render: (article) => (
      <Box sx={{ position: 'relative', height: 60, width: 80 }}>
        <img
          alt={article.title}
          src="https://picsum.photos/100"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
      </Box>
    ),
    mobileOrder: 0,
  },
  {
    id: 'title',
    label: 'タイトル',
    render: (article) => article.title,
    mobileLabel: 'タイトル',
    mobileOrder: 1,
    width: 'auto',
  },
  {
    id: 'status',
    label: 'ステータス',
    render: () => (
      <Chip
        color={statusConfig.published.color}
        label={statusConfig.published.label}
        size="small"
      />
    ),
    sortable: true,
    mobileLabel: 'ステータス',
    mobileOrder: 3,
    width: 120,
  },
  {
    id: 'actions',
    label: 'アクション',
    render: (article) => (
      <Link to={`/articles/${article.id}`}>
        <Button size="small">詳細</Button>
      </Link>
    ),
    mobileOrder: 5,
    width: 120,
  },
];

interface ArticleListProps {
  data?: AdminApiComponents['schemas']['ArticleSimpleResource'][];
  isLoading: boolean;
  totalCount: number;
}

export const ArticleList: React.FC<ArticleListProps> = (props) => (
  <Card sx={{ py: 2 }}>
    <SLDataList
      columns={columns}
      data={props.data}
      isLoading={props.isLoading}
      keyExtractor={(item) => `${item.id}`}
      totalCount={props.totalCount}
    />
  </Card>
);
