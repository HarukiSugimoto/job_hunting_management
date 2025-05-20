// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/functions/debounce)

/**
 * debounce処理用関数
 * 一定時間内に連続でイベントを発火する際、最後の一回のみ実行する
 * @param {T} - debounce後実行するコールバック
 * @param {number} - debounceで待機する時間
 * @return {any} - コールバックの返り値
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  ms: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timer: number | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise<ReturnType<T>>((resolve) => {
      timer = window.setTimeout(() => {
        const returnValue = callback(...args) as ReturnType<T>;
        resolve(returnValue);
      }, ms);
    });
  };
};
