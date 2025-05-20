// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/functions/formatter)

import { formatDistanceToNow, format } from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * 指定された日付から現在までの相対時間を返します。
 * @param {Date | string} date - 日付オブジェクト
 * @param {string} locale - 'en' または 'ja' で言語設定 デフォルト"en"
 * @returns {string} 相対時間文字列
 */
export const formatDateDistance = (date: Date | string) => {
  const dateObj = new Date(date);
  if (dateObj > new Date()) {
    return formatDistanceToNow(new Date(), { addSuffix: true, locale: ja });
  }
  return formatDistanceToNow(date, { addSuffix: true, locale: ja });
};

/**
 * タイムスタンプを適切なフォーマットに変換します。
 * @param {Date | string} date - 日付オブジェクト
 * @param {string} locale - 'en' または 'ja' で言語設定 デフォルト"en"
 * @returns {string} 時間文字列
 */
export const formatDate = (date: Date | string) => {
  const formatString = 'yyyy年MM月dd日(EE) HH:mm';
  return format(new Date(date), formatString, { locale: ja });
};
