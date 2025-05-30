import { Button, Card } from '@mui/material';
import React from 'react';

import { AdminApiComponents } from '@/external';
import { SLDataList } from '@/sakura-like-ui/components/mui/SLDataList';
import type { SLDataTableColumn } from '@/sakura-like-ui/components/mui/SLDataTable';
import { Link } from 'react-router-dom';
import { useCompanyDelete } from '@/hooks/domain/(authenticated)/company/useCompanyDelete';
import { useCustomConfirm } from '@/sakura-like-ui/hooks/CustomConfirm';


interface CompanyListProps {
  data?: AdminApiComponents['schemas']['CompanyResource'][];
  isLoading: boolean;
  totalCount?: number;
}

export const CompanyList: React.FC<CompanyListProps> = (props) => {
  const { customConfirm } = useCustomConfirm();
  const { deleteCompany } = useCompanyDelete();

  const deleteConfirm = async (company: AdminApiComponents['schemas']['CompanyResource']) => {
    if (
      await customConfirm({
        title: '削除確認',
        description: '本当に削除しますか？',
        positiveButtonLabel: '削除',
        negativeButtonLabel: 'キャンセル',
      })
    ) {
      deleteCompany(company.id);
    } else {
      window.alert('Cancel');
    }
  };

  const columns: SLDataTableColumn<AdminApiComponents['schemas']['CompanyResource']>[] = [
    {
      id: 'id',
      label: 'ID',
      render: (company) => <Link to={`/companys/${company.id}/edit`}>{company.id}</Link>,
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
    {
      id: 'actions',
      label: '削除',
      render: (company) => (
        <Button color="error" onClick={() => deleteConfirm(company)}>
          削除
        </Button>
      ),
    },
  ];
  return (
    <>
      <Card sx={{ py: 2 }}>
        <SLDataList
          columns={columns}
          data={props.data}
          isLoading={props.isLoading}
          keyExtractor={(item) => `${item.id}-${item.name}`}
          totalCount={props.totalCount ?? 0}
        />
      </Card>
    </>
  )
}
