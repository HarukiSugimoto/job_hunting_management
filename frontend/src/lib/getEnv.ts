interface EnvValues {
  ENVIRONMENT: 'production' | 'development' | 'test';
  SERVICE_NAME: string;
  API_BASE_URL: string;
  USE_MSW: boolean;
  API_REQUEST_DELAY_MS: number;
}

const checkBoolean = (value: unknown) => {
  // "0", 0, "false", false は false と判定
  if (
    value === 0 ||
    value === '0' ||
    value === false ||
    value === 'false' ||
    value === 'FALSE' ||
    value === 'False'
  ) {
    return false;
  }
  // "1", 1, "true", true は true と判定
  if (
    value === 1 ||
    value === '1' ||
    value === true ||
    value === 'true' ||
    value === 'TRUE' ||
    value === 'True'
  ) {
    return true;
  }

  return false;
};

/**
 * envの値を取得する
 */
export const getEnv = <T extends keyof EnvValues>(key: T): EnvValues[T] | undefined => {
  switch (key) {
    case 'SERVICE_NAME':
      return import.meta.env.VITE_SERVICE_NAME as EnvValues[T] | undefined;
    case 'ENVIRONMENT':
      return import.meta.env.VITE_ENVIRONMENT as EnvValues[T] | undefined;
    case 'API_BASE_URL':
      return import.meta.env.VITE_API_BASE_URL as EnvValues[T] | undefined;
    case 'USE_MSW':
      return checkBoolean(import.meta.env.VITE_USE_MSW) as EnvValues[T] | undefined;
    case 'API_REQUEST_DELAY_MS': {
      const value = import.meta.env.VITE_API_REQUEST_DELAY_MS;
      const parsedValue = parseInt(value as string, 10);
      if (isNaN(parsedValue)) {
        return 0 as EnvValues[T];
      }
      return parsedValue as EnvValues[T];
    }
    default:
      throw new Error('Invalid key');
  }
};
