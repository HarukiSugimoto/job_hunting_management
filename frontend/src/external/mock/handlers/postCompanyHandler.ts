import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockCompanyResource } from '../components/CompanyResource';

const path = '/api/company' as const;

export const postCompanyHandler = http.post<
  never,
  AdminApiPaths['/company']['post']['requestBody'],
  AdminApiPaths['/company']['post']['responses']['200']['content']['application/json']
>(path, () => 
    HttpResponse.json({
      data: mockCompanyResource[0]
    })
);
