import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { RootErrorPage } from '@/app/error';
import { RootRouteLayout } from '@/app/layout';
import { NotFoundPage } from '@/app/not-found';
import { RootPage } from '@/app/page';
import { routesAuthenticated } from '@/router/routesAuthenticated';
import { routesUnauthenticated } from '@/router/routesUnauthenticated';

const routes: RouteObject[] = [
  {
    path: '/', // 最上位のルート
    element: <RootRouteLayout />, // 最上位のレイアウト
    errorElement: <RootErrorPage />, // エラーページ
    children: [
      {
        index: true, // "/"のパス専用のルート
        element: <RootPage />,
      },
      routesAuthenticated,
      routesUnauthenticated,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Router: React.FC = () => <RouterProvider router={router} />;
