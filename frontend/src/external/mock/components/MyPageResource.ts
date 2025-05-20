import { AdminApiComponents } from '@/external';

const mockMyPagePatterns: AdminApiComponents['schemas']['MyPageResource'][] = [
  { 
    id: 1, 
    link: 'https://example.com/1',
    login_id: '1xxxx1', 
    priority: 1, 
    type: "エンジニア",
    company: { id: 1, name: '株式会社oo' }, 
  },
  { 
    id: 2, 
    link: 'https://example.com/1',
    login_id: '1xxxx1', 
    priority: 0, 
    type: "営業",
    company: { id: 1, name: '株式会社xx' }, 
  },
  { 
    id: 3, 
    link: 'https://example.com/1',
    login_id: '1xxxx1', 
    priority: 2, 
    type: "コンサル",
    company: { id: 1, name: '株式会社gg' }, 
  },
];

export const mockMyPageResource: AdminApiComponents['schemas']['MyPageResource'][] =
  mockMyPagePatterns
