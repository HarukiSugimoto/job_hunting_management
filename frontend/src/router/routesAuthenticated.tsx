import type { RouteObject } from 'react-router-dom';
import { ArticleEditPage } from '@/app/(authenticated)/articles/[articleId]/edit/page';
import { ArticleDetailPage } from '@/app/(authenticated)/articles/[articleId]/page';
import { ArticleNewPage } from '@/app/(authenticated)/articles/new/page';
import { ArticleNewWithConfirmPage } from '@/app/(authenticated)/articles/new-with-confirm/page';
import { ArticlesPage } from '@/app/(authenticated)/articles/page';
import { DashboardPage } from '@/app/(authenticated)/dashboard/page';
import { AuthenticatedRouteLayout } from '@/app/(authenticated)/layout';
import { SettingPage } from '@/app/(authenticated)/settings/page';
import { CompanysPage } from '@/app/(authenticated)/companys/page';
import { MyPageList } from '@/components/domain/(authenticated)/mypages/MyPageList';
import { MyPagesPage } from '@/app/(authenticated)/mypages/page';
import { CompanyNewPage } from '@/app/(authenticated)/companys/new/page';
import { CompanyEditPage } from '@/app/(authenticated)/companys/edit/page';
import { MyPageNewPage } from '@/app/(authenticated)/mypages/new/page';

/**
 * ログイン認証が必要なページのルーティング情報
 */
export const routesAuthenticated: RouteObject = {
  element: <AuthenticatedRouteLayout />,
  children: [
    { path: '/dashboard', element: <DashboardPage /> },
    {
      path: 'articles',
      children: [
        { path: '', element: <ArticlesPage /> },
        { path: 'new', element: <ArticleNewPage /> },
        { path: 'new-with-confirm', element: <ArticleNewWithConfirmPage /> },
        { path: ':articleId', element: <ArticleDetailPage /> },
        { path: ':articleId/edit', element: <ArticleEditPage /> },
      ],
    },
    {
      path: 'settings',
      children: [
        {
          path: '',
          element: <SettingPage />,
        },
      ],
    },
    {
      path: 'companys',
      children: [
        {
          path: '',
          element: <CompanysPage />,
        },
        {
          path: 'new',
          element: <CompanyNewPage />,
        },
        { 
          path: ':companyId/edit', 
          element: <CompanyEditPage /> 
        },
      ]
    },
    {
      path: 'mypages',
      children: [
        {
          path: '',
          element: <MyPagesPage />,
        },
        {
          path: 'new',
          element: <MyPageNewPage />,
        }
      ]
    }
  ],
};
