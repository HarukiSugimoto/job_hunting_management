import { http, HttpResponse } from 'msw';
import type { AdminApiPaths } from '@/external';
import { mockCompanyResource } from '@/external/mock/components/CompanyResource';

export const getCompanysHandler = http.get<
  never,
  AdminApiPaths['/company']['get']['requestBody'],
  AdminApiPaths['/company']['get']['responses']['200']['content']['application/json']
>('/api/company', () => {
  return HttpResponse.json({
    data: mockCompanyResource,
  });
});
