import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockArticleResource } from '@/external/mock/components/ArticleResource';

const path = '/api/articles' as const;

export const postArticlesHandler = http.post<
  { article: string },
  AdminApiPaths['/articles']['post']['requestBody'],
  AdminApiPaths['/articles']['post']['responses']['200']['content']['application/json']
>(path, () =>
  HttpResponse.json({
    article: {
      ...mockArticleResource,
    },
  })
);
