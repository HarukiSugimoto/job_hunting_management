import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockCompanyResource } from '@/external/mock/components/CompanyResource';

const path = '/api/mypage' as const;

export const postMyPagesHandler = http.post<
  never,
  AdminApiPaths['/mypage']['post']['requestBody'],
  AdminApiPaths['/mypage']['post']['responses']['200']['content']['application/json']
>(path, () => {
  return HttpResponse.json({
    data: {
      id: 123,
      link: 'https://aa/com',
      login_id: 'axxxxa',
      type: 'engineer',
      priority: 1,
      company: mockCompanyResource[0]
    }
  });
});
