import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockCompanyResource } from '@/external/mock/components/CompanyResource';

const path = '/api/company/:id' as const;

export const getCompanysDetailHandler = http.get<
  never,
  AdminApiPaths['/company/{company}']['get']['requestBody'],
  AdminApiPaths['/company/{company}']['get']['responses']['200']['content']['application/json']
>(path, (req) => {
  const { id } = req.params;
  return HttpResponse.json({
    data: mockCompanyResource.filter((company) => company.id === Number(id))[0],
  });
});
