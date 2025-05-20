import { http, HttpResponse } from 'msw';
import type { AdminApiPaths } from '@/external';
import { createMockArticleSimpleResource } from '@/external/mock/components/ArticleSimpleResource';

export const getArticlesHandler = http.get<
  never,
  AdminApiPaths['/articles']['get']['requestBody'],
  AdminApiPaths['/articles']['get']['responses']['200']['content']['application/json']
>('/api/articles', ({ request }) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get('page') ?? '1', 10);
  const parPage = Number.parseInt(url.searchParams.get('par_page') ?? '5', 10);
  const totalArticles = 99;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const allArticles = Array.from({ length: totalArticles }, (_, index) =>
    createMockArticleSimpleResource(index)
  );

  const startIndex = (page - 1) * parPage;
  const endIndex = startIndex + parPage;
  const paginatedArticles = allArticles.slice(startIndex, endIndex);

  const pageResource: AdminApiPaths['/articles']['get']['responses']['200']['content']['application/json']['page'] =
    {
      current: page,
      last: Math.ceil(totalArticles / parPage),
      per: parPage,
      total: totalArticles,
    };

  return HttpResponse.json({
    articles: paginatedArticles,
    page: pageResource,
  });
});
