import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type NotFoundContextType = {
  isNotFound: boolean;
  setIsNotFound: (value: boolean) => void;
};

const notFoundContext = createContext<NotFoundContextType>({
  isNotFound: false,
  setIsNotFound: () => {},
});

type NotFoundProviderProps = {
  children: ReactNode;
};

export const NotFoundProvider: React.FC<NotFoundProviderProps> = (props) => {
  const [isNotFound, setIsNotFound] = useState(false);
  const location = useLocation();

  // ページ遷移(パス変更)が発生したら NotFound フラグを false にリセット
  useEffect(() => {
    setIsNotFound(false);
  }, [location]);

  const value = useMemo(() => ({ isNotFound, setIsNotFound }), [isNotFound]);

  return <notFoundContext.Provider value={value}>{props.children}</notFoundContext.Provider>;
};

export const useNotFoundContext = () => useContext(notFoundContext);
