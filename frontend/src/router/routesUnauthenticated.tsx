import type { RouteObject } from 'react-router-dom';
import { UnauthenticatedRouteLayout } from '@/app/(unauthenticated)/layout';
import { SignInPage } from '@/app/(unauthenticated)/sign-in/page';

/**
 * 未ログインでアクセスするページのルーティング情報
 */
export const routesUnauthenticated: RouteObject = {
  element: <UnauthenticatedRouteLayout />,
  children: [
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};
