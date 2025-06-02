import { Button, Card, Stack } from '@mui/material';
import type React from 'react';

import { AdminApiComponents } from '@/external';
import { SLDataList } from '@/sakura-like-ui/components/mui/SLDataList';
import type { SLDataTableColumn } from '@/sakura-like-ui/components/mui/SLDataTable';
import { useCustomConfirm } from '@/sakura-like-ui/hooks/CustomConfirm';
import { useMyPageDelete } from '@/hooks/domain/(authenticated)/mypage/useMyPageDelete';
import { Link } from 'react-router-dom';

const priorityLabel = (priority: number) => {
  switch (priority) {
    case 0:
      return '低';
    case 1:
      return '中';
    case 2:
      return '高';
    default:
      return '不明';
  }
}

interface MyPageListProps {
  data?: AdminApiComponents['schemas']['MyPageResource'][];
  isLoading: boolean;
  totalCount?: number;
}

export const MyPageList: React.FC<MyPageListProps> = (props) => {
  const { customConfirm } = useCustomConfirm();
  const { deleteMyPage } = useMyPageDelete();

  const deleteConfirm = async (myPage: AdminApiComponents['schemas']['MyPageResource']) => {
    if (
      await customConfirm({
        title: '削除確認',
        description: '本当に削除しますか？',
        positiveButtonLabel: '削除',
        negativeButtonLabel: 'キャンセル',
      })
    ) {
      deleteMyPage(myPage.id);
    } else {
      window.alert('Cancel');
    }
  };

  const columns: SLDataTableColumn<AdminApiComponents['schemas']['MyPageResource']>[] = [
    {
      id: 'companyName',
      label: '会社名',
      width: '20%',
      render: (mypage) => mypage.company!.name,
      mobileOrder: 0,
    },
    {
      id: 'type',
      label: '職種',
      width: '20%',
      render: (mypage) => mypage.type,
      mobileOrder: 0,
    },
    {
      id: 'priority',
      label: '優先度',
      width: '10%',
      render: (mypage) => priorityLabel(mypage.priority),
      sortable: true,
      mobileOrder: 1,
    },
    {
      id: 'loginId',
      label: 'ログインID',
      render: (mypage) => mypage.login_id,
      mobileLabel: 'ログインID',
      mobileOrder: 3,
    },
    {
      id: 'link',
      label: 'URL',
      render: (mypage) => mypage.link,
    },
    {
        id: 'actions',
        label: '',
        render: (mypage) => (
          <>
            <Stack direction={"row"}>

              <Button href={`/mypages/${mypage.id}/edit`}>編集</Button>
              <Button color="error" onClick={() => deleteConfirm(mypage)}>
                削除
              </Button>
            </Stack>
          </>
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
          keyExtractor={(item) => `${item.id}`}
          totalCount={props.totalCount ?? 0}
        />
      </Card>
    </>
  )
};
