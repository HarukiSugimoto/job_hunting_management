import { AdminApiComponents } from '@/external';

// サンプルパターン（10個）
const mockArticlePatterns: {
  id: number;
  title: string;
}[] = [
  { id: 13, title: '〇〇の最新ニュース' },
  { id: 27, title: '〇〇のまとめ' },
  { id: 14, title: '△△の最新ニュース' },
  { id: 23, title: '△△商品紹介' },
  { id: 11, title: '2025年最新〇〇ランキング' },
  { id: 12, title: '2024年最新〇〇ランキング' },
  { id: 28, title: '〇〇やってみた' },
  {
    id: 40,
    title:
      'ちょっと長いテキストの投稿 【昔々あるところにおじいさんとおばあさんが住んでいました。ある日おじいさんは山へ芝刈りに、おばあさんは川へ洗濯に行きました】',
  },
  { id: 1, title: 'Hello World' },
  { id: 34, title: 'Example Article Title' },
];

export const createMockArticleResource = (
  index: number
): AdminApiComponents['schemas']['ArticleResource'] => {
  const patternIndex = index % mockArticlePatterns.length;
  const pattern = mockArticlePatterns[patternIndex];

  const suffix = index >= mockArticlePatterns.length ? `${index + 1}` : '';

  return {
    id: pattern.id,
    title: `${pattern.title}${suffix}`,
    content: `
    <h2>タイトル</h2>
    <p>本文</p>
  `,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-02-20T00:00:00Z',
  };
};

export const mockArticleResource: AdminApiComponents['schemas']['ArticleResource'] =
  createMockArticleResource(0);
