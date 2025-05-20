import { delay, http } from 'msw';
import { setupWorker } from 'msw/browser';
import { getArticleDetailHandler } from '@/external/mock/handlers/getArticleDetailHandler';
import { getArticlesHandler } from '@/external/mock/handlers/getArticlesHandler';
import { getAuthLogoutHandler } from '@/external/mock/handlers/getAuthLogoutHandler';
import { getMeHandler } from '@/external/mock/handlers/getMeHandler';
import { postArticlesArticleHandler } from '@/external/mock/handlers/postArticlesArticleHandler';
import { postArticlesHandler } from '@/external/mock/handlers/postArticlesHandler';
import { postAuthLoginHandler } from '@/external/mock/handlers/postAuthLoginHandler';
import { getEnv } from '@/lib/getEnv';
import { getCompanysHandler } from './handlers/getCompanysHandler';
import { getMyPagesHandler } from './handlers/getMyPagesHandler';
import { postCompanyHandler } from './handlers/postCompanyHandler';
import { getCompanysDetailHandler } from './handlers/getCompanysDetailHandler';
import { putCompanysHandler } from './handlers/putCompanysHandler';
import { deleteCompanysHandler } from './handlers/deleteCompanysHandler';

const apiDelay = Number(getEnv('API_REQUEST_DELAY_MS'));

const handlers = [
  // /api/me のみ半分の delay にして初回のローディングと、その後ろのローディングの2種類を見分けられるようにしておく
  http.all('/api/me', async () => {
    await delay(apiDelay / 2);
  }),
  // その他の /api/* は通常の delay
  http.all('/api/*', async ({ request }) => {
    if (request.url.endsWith('/me')) return; // 上で処理されるのでスキップ
    await delay(apiDelay);
  }),
  getMeHandler,
  getArticlesHandler,
  postArticlesHandler,
  postArticlesArticleHandler,
  getArticleDetailHandler,
  postAuthLoginHandler,
  getAuthLogoutHandler,
  getCompanysHandler,
  getCompanysDetailHandler,
  postCompanyHandler,
  putCompanysHandler,
  deleteCompanysHandler,
  getMyPagesHandler,

];

export const worker = setupWorker(...handlers);
