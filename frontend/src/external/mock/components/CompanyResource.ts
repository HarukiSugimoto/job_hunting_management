import { AdminApiComponents } from '@/external';

// サンプルパターン（10個）
const mockCompanyPatterns: {
  id: number;
  name: string;
}[] = [
  { id: 13, name: '株式会社oo' },
  { id: 33, name: '株式会社xx' },
  { id: 4, name: '株式会社aa' },
  { id: 3, name: '株式会社ff' },
  { id: 135, name: '株式会社rr' },
  { id: 1355, name: '株式会社hh' },
  { id: 112, name: '株式会社ll' },
];

export const createMockCompanyResource = (
  index: number
): AdminApiComponents['schemas']['CompanyResource'] => {
  const patternIndex = index % mockCompanyPatterns.length;
  const pattern = mockCompanyPatterns[patternIndex];

  const suffix = index >= mockCompanyPatterns.length ? `${index + 1}` : '';
  return {
    id: pattern.id,
    name: `${pattern.name}${suffix}`,
  };
};

export const mockArticleResource: AdminApiComponents['schemas']['CompanyResource'] =
  createMockCompanyResource(0);
