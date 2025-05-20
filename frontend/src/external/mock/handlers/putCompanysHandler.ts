import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockCompanyResource } from '@/external/mock/components/CompanyResource';

const path = '/api/company/:id' as const;

export const putCompanysHandler = http.put<
  never,
  AdminApiPaths['/company/{company}']['put']['requestBody'],
  AdminApiPaths['/company/{company}']['put']['responses']['200']['content']['application/json']
>(path, (req) => {
  const { id } = req.params;
  return HttpResponse.json({
    data: mockCompanyResource.filter((company) => company.id === Number(id))[0],
  });
});
