import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const RootErrorPage = () => {
  const error = useRouteError();

  let message = '予期せぬエラーが発生しました。';

  if (isRouteErrorResponse(error)) {
    // fetch系のルートエラーなど
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    // JavaScriptの例外
    message = error.message;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>エラーが発生しました</h1>
      <p>{message}</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        ホームに戻る
      </a>
    </div>
  );
};
