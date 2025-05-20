import { Button, Card } from '@mui/material';
import React from 'react';

import { AdminApiComponents } from '@/external';
import { SLDataList } from '@/sakura-like-ui/components/mui/SLDataList';
import type { SLDataTableColumn } from '@/sakura-like-ui/components/mui/SLDataTable';
import { Link } from 'react-router-dom';
import { DeleteConfirmDialog } from '@/components/common/DeleteConfirmDialog';
import { useCompanyDelete } from '@/hooks/domain/(authenticated)/company/useCompanyDelete';


interface CompanyListProps {
  data?: AdminApiComponents['schemas']['CompanyResource'][];
  isLoading: boolean;
  totalCount?: number;
}

export const CompanyList: React.FC<CompanyListProps> = (props) => {
  const [selectedCompany, setSelectedCompany] = React.useState<AdminApiComponents['schemas']['CompanyResource'] | null>(null);
  const [open, setOpen] = React.useState(false);
  const { deleteCompany } = useCompanyDelete();

  const handleDeleteClick = (company: AdminApiComponents['schemas']['CompanyResource']) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCompany) {
      await deleteCompany(selectedCompany.id);
      setOpen(false);
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
        <Button color="error" onClick={() => handleDeleteClick(company)}>
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
      <DeleteConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
        title="会社を削除しますか？"
        description={`「${selectedCompany?.name}」を削除してもよろしいですか？`}
      />
    </>
  )
}
