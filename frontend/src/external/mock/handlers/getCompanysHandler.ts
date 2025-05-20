import { http, HttpResponse } from 'msw';
import type { AdminApiPaths } from '@/external';
import { createMockCompanyResource } from '@/external/mock/components/CompanyResource';

export const getCompanysHandler = http.get<
  never,
  AdminApiPaths['/company']['get']['requestBody'],
  AdminApiPaths['/company']['get']['responses']['200']['content']['application/json']
>('/api/company', ({ request }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get('page') ?? '1', 10);
  const parPage = Number.parseInt(url.searchParams.get('par_page') ?? '5', 10);
  const totalArticles = 99;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const allArticles = Array.from({ length: totalArticles }, (_, index) =>
    createMockCompanyResource(index)
  );

  const startIndex = (page - 1) * parPage;
  const endIndex = startIndex + parPage;
  const paginatedArticles = allArticles.slice(startIndex, endIndex);


  return HttpResponse.json({
    data: paginatedArticles,
  });
});
