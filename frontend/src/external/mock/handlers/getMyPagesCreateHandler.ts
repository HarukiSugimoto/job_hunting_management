import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockCompanyResource } from '@/external/mock/components/CompanyResource';

const path = '/api/mypage/create' as const;

export const getMyPagesCreateHandler = http.get<
  never,
  AdminApiPaths['/mypage/create']['get']['requestBody'],
  AdminApiPaths['/mypage/create']['get']['responses']['200']['content']['application/json']
>(path, () => {
  return HttpResponse.json({
    priorities: [
      { value: 1, label: 'High' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'Low' },
    ],
    companies: mockCompanyResource,
  });
});
