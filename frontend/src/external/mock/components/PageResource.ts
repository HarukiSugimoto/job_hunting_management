import { AdminApiComponents } from '@/external';

export const mockPageResource: AdminApiComponents['schemas']['PageResource'] = {
  per: 20,
  current: 1,
  last: 5,
  total: 99,
};
