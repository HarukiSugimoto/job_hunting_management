import { AdminApiComponents } from '@/external';

const mockMyPagePatterns: AdminApiComponents['schemas']['MyPageResource'][] = [
  { id: 11, login_id: '1xxxx1', company: { id: 1, name: '株式会社oo' }, priority: '高', status: 1, link: 'https://example.com/1' },
  ];

export const mockMyPageResource: AdminApiComponents['schemas']['MyPageResource'][] =
  mockMyPagePatterns
