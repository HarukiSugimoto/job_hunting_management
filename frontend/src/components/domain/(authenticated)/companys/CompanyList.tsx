import { Card } from '@mui/material';
import type React from 'react';

import { AdminApiComponents } from '@/external';
import { SLDataList } from '@/sakura-like-ui/components/mui/SLDataList';
import type { SLDataTableColumn } from '@/sakura-like-ui/components/mui/SLDataTable';

const columns: SLDataTableColumn<AdminApiComponents['schemas']['CompanyResource']>[] = [
  {
    id: 'id',
    label: 'ID',
    render: (company) => company.id,
    sortable: true,
    mobileLabel: 'ID',
    mobileOrder: 2,
  },
  {
    id: 'name',
    label: '会社名',
    width: '80%',
    render: (company) => company.name,
    mobileOrder: 0,
  },
];

interface CompanyListProps {
  data?: AdminApiComponents['schemas']['CompanyResource'][];
  isLoading: boolean;
  totalCount?: number;
}

export const CompanyList: React.FC<CompanyListProps> = (props) => (
  <Card sx={{ py: 2 }}>
    <SLDataList
      columns={columns}
      data={props.data}
      isLoading={props.isLoading}
      keyExtractor={(item) => `${item.id}-${item.name}`}
      totalCount={props.totalCount ?? 0}
    />
  </Card>
);
