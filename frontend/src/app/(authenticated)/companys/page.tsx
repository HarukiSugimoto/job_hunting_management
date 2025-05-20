import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { CompanyList } from '@/components/domain/(authenticated)/companys/CompanyList';
import { useCompanyListData } from '@/hooks/domain/(authenticated)/company/companyListPageHooks';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';

export const CompanysPage: FC = () => {
  const { results, isLoading, error } = useCompanyListData();

  if (error) {
    throw new Error(error);
  }

  return (
    <SLPageContainer
      title="Companys"
      titleRightContent={
        <Button
          component={Link}
          startIcon={<AddCircleIcon />}
          to="/companys/new"
          variant="contained"
        >
          新規作成
        </Button>
      }
    >

      <CompanyList
        data={results?.data}
        isLoading={isLoading}
      />
    </SLPageContainer>
  );
};
