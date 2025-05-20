import { NotFoundPage } from '@/app/not-found';
import { useNotFoundContext } from '@/contexts/notFound';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const { isNotFound } = useNotFoundContext();
  if (isNotFound) {
    return <NotFoundPage />;
  }
  return props.children;
};
