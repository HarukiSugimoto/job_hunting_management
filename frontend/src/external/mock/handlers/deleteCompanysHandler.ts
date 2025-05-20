import { http, HttpResponse } from 'msw';
import type { AdminApiPaths } from '@/external';
const path = '/api/company/:id' as const;
export const deleteCompanysHandler = http.delete<
  never,
  never,
  AdminApiPaths['/company/{company}']['delete']['responses']['204']['content']
>(path, () => {
  return HttpResponse.json();
});
