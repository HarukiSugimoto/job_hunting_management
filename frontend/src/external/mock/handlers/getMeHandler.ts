import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockMeResource } from '@/external/mock/components/MeResource';

const path = '/api/me' as const;

/**
 * 認証済みのユーザ情報を取得するAPI
 * モックではlocalStorageにmswAuthがある場合に認証済みとみなす
 */
export const getMeHandler = http.get<
  never,
  AdminApiPaths['/me']['get']['requestBody'],
  AdminApiPaths['/me']['get']['responses']['200']['content']['application/json']
>(path, () => {
  const mswAuth = localStorage.getItem('mswAuth');
  if (mswAuth) {
    return HttpResponse.json({
      loginUser: mockMeResource,
    });
  }

  return new HttpResponse(null, {
    status: 401,
    statusText: 'Unauthorized',
  });
});
