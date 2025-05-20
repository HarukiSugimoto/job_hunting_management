import { http, HttpResponse } from 'msw';
import { AdminApiPaths } from '@/external';
import { mockArticleResource } from '@/external/mock/components/ArticleResource';

const path = '/api/articles/:article' as const;

export const postArticlesArticleHandler = http.post<
  { article: string },
  AdminApiPaths['/articles/{article}']['post']['requestBody'],
  AdminApiPaths['/articles/{article}']['post']['responses']['200']['content']['application/json']
>(path, ({ params }) =>
  HttpResponse.json({
    article: {
      ...mockArticleResource,
      id: parseInt(params.article, 10),
      // 更新された情報が反映されたように見せるために updatedAt を現在時刻に
      updatedAt: new Date().toISOString(),
    },
  })
);
