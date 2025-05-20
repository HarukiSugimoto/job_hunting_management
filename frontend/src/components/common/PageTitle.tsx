import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEnv } from '@/lib/getEnv';

interface PageTitleProps {
  title: string;
}

const serviceName = getEnv('SERVICE_NAME');

/**
 * title tagを設定する
 */
export const PageTitle: React.FC<PageTitleProps> = (props) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${props.title} | ${serviceName}`;
  }, [location, props.title]);

  return null;
};
