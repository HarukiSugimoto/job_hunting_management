import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { createMockArticleResource } from '@/external/mock/components/ArticleResource';

const path = '/api/articles/:id' as const;

export const getArticleDetailHandler = http.get<
  never,
  AdminApiPaths['/articles/{article}']['get']['requestBody'],
  AdminApiPaths['/articles/{article}']['get']['responses']['200']['content']['application/json']
>(path, (req) => {
  const { id } = req.params;
  return HttpResponse.json({
    article: createMockArticleResource(id),
  });
});
