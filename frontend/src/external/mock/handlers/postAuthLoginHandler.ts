import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockMeResource } from '@/external/mock/components/MeResource';

const path = '/api/auth/login' as const;

export const postAuthLoginHandler = http.post<
  never,
  AdminApiPaths['/auth/login']['post']['requestBody']['content']['application/json'],
  AdminApiPaths['/auth/login']['post']['responses']['200']['content']['application/json']
>(path, async ({ request }) => {
  const body = await request.json();

  if (body.password === 'password1234') {
    // 認証成功時に localStorage に mswAuth=1 を保存
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('mswAuth', '1');
    }
    return HttpResponse.json({
      loginUser: mockMeResource,
    });
  }

  return new HttpResponse(null, {
    status: 401,
    statusText: 'Unauthorized',
  });
});
