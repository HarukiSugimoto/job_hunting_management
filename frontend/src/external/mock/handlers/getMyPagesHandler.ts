import { http, HttpResponse } from 'msw';
import type { AdminApiPaths } from '@/external';
import { mockMyPageResource } from '../components/MyPageResource';

export const getMyPagesHandler = http.get<
  never,
  AdminApiPaths['/mypage']['get']['requestBody'],
  AdminApiPaths['/mypage']['get']['responses']['200']['content']['application/json']
>('/api/mypage', () => {


  return HttpResponse.json({
    data: mockMyPageResource,
  });
});
