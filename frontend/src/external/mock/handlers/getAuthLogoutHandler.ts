import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';

const path = '/api/auth/logout' as const;

export const getAuthLogoutHandler = http.get<
  never,
  AdminApiPaths['/auth/logout']['get']['parameters'],
  AdminApiPaths['/auth/logout']['get']['responses']['200']['content']['application/json']
>(path, () => {
  const mswAuth = localStorage.getItem('mswAuth');
  if (mswAuth) {
    localStorage.removeItem('mswAuth');
    return HttpResponse.json();
  }

  return new HttpResponse(null, {
    status: 401,
    statusText: 'Unauthorized',
  });
});
