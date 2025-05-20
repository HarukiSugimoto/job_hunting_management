import { useEffect, useState, ReactNode } from 'react';
import { getEnv } from '@/lib/getEnv';

interface MockProviderProps {
  children: ReactNode;
}

let workerPromise: Promise<void> | null = null;

const initMockWorker = () => {
  // すでに起動処理を始めているかどうかチェック
  if (workerPromise) {
    return workerPromise;
  }
  // まだなら初回起動を記憶
  workerPromise = import('@/external/mock/browser').then(({ worker }) =>
    worker.start({ onUnhandledRequest: 'bypass' }).then(() => undefined)
  );

  return workerPromise;
};

export const MockProvider = (props: MockProviderProps) => {
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    const enableApiMocking = async () => {
      if (getEnv('USE_MSW') && typeof window !== 'undefined') {
        await initMockWorker(); // MSW の起動を待つ
      }
      setIsMswReady(true); // MSW の準備が完了したら children を表示
    };

    enableApiMocking();
  }, []);

  // MSW の準備ができるまで何も表示しない
  if (!isMswReady) {
    return null;
  }

  return props.children;
};
