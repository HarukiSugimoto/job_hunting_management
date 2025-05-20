// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/hooks/notFound)

// eslint-disable-next-line no-restricted-imports
import { useNotFoundContext } from './notFoundContext';

export const useNotFound = () => {
  const { setIsNotFound } = useNotFoundContext();

  // 呼び出されたら NotFound フラグを true にして強制的に NotFound を表示させる
  const notFound = () => {
    setIsNotFound(true);
  };

  return { notFound };
};
