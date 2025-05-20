import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { MyPageList } from '@/components/domain/(authenticated)/mypages/MyPageList';
import { SLPageContainer } from '@/sakura-like-ui/components/mui/SLPageContainer';
import { useMyPageListData } from '@/hooks/domain/(authenticated)/mypage/mypageListPageHooks';

export const MyPagesPage: FC = () => {
  const { results, isLoading, error } = useMyPageListData();

  if (error) {
    throw new Error(error);
  }

  return (
    <SLPageContainer
      title="My Pages"
      titleRightContent={
        <Button
          component={Link}
          startIcon={<AddCircleIcon />}
          to="/mypages/new"
          variant="contained"
        >
          新規作成
        </Button>
      }
    >

      <MyPageList
        data={results?.data}
        isLoading={isLoading}
      />
    </SLPageContainer>
  );
};
