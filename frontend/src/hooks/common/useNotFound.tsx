import { useNotFoundContext } from '@/contexts/notFound';

export const useNotFound = () => {
  const { setIsNotFound } = useNotFoundContext();

  // 呼び出されたら NotFound フラグを true にして強制的に NotFound を表示させる
  const notFound = () => {
    setIsNotFound(true);
  };

  return { notFound };
};
