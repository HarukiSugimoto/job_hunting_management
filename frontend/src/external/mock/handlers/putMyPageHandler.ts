import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockMyPageResource } from '../components/MyPageResource';

const path = '/api/mypage/:id' as const;

export const putMyPageHandler = http.put<
  never,
  AdminApiPaths['/mypage/{mypage}']['put']['requestBody'],
  AdminApiPaths['/mypage/{mypage}']['put']['responses']['200']['content']['application/json']
>(path, (req) => {
  const { id } = req.params;
  return HttpResponse.json({
    data: mockMyPageResource.filter((mypage) => mypage.id === Number(id))[0],
  });
});
