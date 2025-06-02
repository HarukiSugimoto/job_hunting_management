import { AdminApiComponents } from '@/external';
import { mockCompanyResource } from './CompanyResource';

const mockMyPagePatterns: AdminApiComponents['schemas']['MyPageResource'][] = [
  { 
    id: 1, 
    link: 'https://example.com/1',
    login_id: '1xxxx1', 
    priority: 1, 
    type: "エンジニア",
    company: mockCompanyResource[0], 
  },
  { 
    id: 2, 
    link: 'https://example.com/1',
    login_id: '1xxxx1', 
    priority: 0, 
    type: "営業",
    company: mockCompanyResource[1], 
  },
  { 
    id: 3, 
    link: 'https://example.com/1',
    login_id: '1xxxx1', 
    priority: 2, 
    type: "コンサル",
    company: mockCompanyResource[2], 
  },
];

export const mockMyPageResource: AdminApiComponents['schemas']['MyPageResource'][] =
  mockMyPagePatterns
