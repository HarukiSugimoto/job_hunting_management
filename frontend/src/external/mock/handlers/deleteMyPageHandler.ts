import { http, HttpResponse } from 'msw';
import type { AdminApiPaths } from '@/external';
const path = '/api/mypage/:id' as const;
export const deleteMyPageHandler = http.delete<
  never,
  never,
  AdminApiPaths['/mypage/{mypage}']['delete']['responses']['204']['content']
>(path, () => {
  return HttpResponse.json();
});
