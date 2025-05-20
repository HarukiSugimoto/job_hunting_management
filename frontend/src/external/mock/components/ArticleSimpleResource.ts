import { AdminApiComponents } from '@/external';

// サンプルパターン（10個）
const mockArticlePatterns: {
  title: string;
}[] = [
  { title: '〇〇の最新ニュース' },
  { title: '〇〇のまとめ' },
  { title: '△△の最新ニュース' },
  { title: '△△商品紹介' },
  { title: '2025年最新〇〇ランキング' },
  { title: '2024年最新〇〇ランキング' },
  { title: '〇〇やってみた' },
  {
    title:
      'ちょっと長いテキストの投稿 【昔々あるところにおじいさんとおばあさんが住んでいました。ある日おじいさんは山へ芝刈りに、おばあさんは川へ洗濯に行きました】',
  },
  { title: 'Hello World' },
  { title: 'Example Article Title' },
];

export const createMockArticleSimpleResource = (
  index: number
): AdminApiComponents['schemas']['ArticleSimpleResource'] => {
  const patternIndex = index % mockArticlePatterns.length;
  const pattern = mockArticlePatterns[patternIndex];

  const suffix = index >= mockArticlePatterns.length ? `${index + 1}` : '';

  return {
    id: index + 1,
    title: `${pattern.title}${suffix}`,
  };
};

export const mockArticleSimpleResource: AdminApiComponents['schemas']['ArticleSimpleResource'] =
  createMockArticleSimpleResource(0);
