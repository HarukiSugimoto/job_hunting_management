// Generated from SakuraLikeUI v0.1.1 (/Users/nyamaguchi/dev/howcollect/admin-template/node_modules/@how-collect/sakura-like-ui/templates/hooks/CustomConfirm)

import { useContext } from 'react';
// eslint-disable-next-line no-restricted-imports
import { customConfirmContext } from './customConfirmContext';

// ✅ カスタム Hook: Context から customConfirm を取得
export const useCustomConfirm = () => {
  const context = useContext(customConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return { customConfirm: context.customConfirm };
};
