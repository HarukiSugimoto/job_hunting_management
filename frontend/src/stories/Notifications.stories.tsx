import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { useNotifications } from '@toolpad/core/useNotifications';

const NotificationSampleButton: React.FC<{
  severity: Required<Parameters<ReturnType<typeof useNotifications>['show']>>['1']['severity'];
  autoHideDuration: Required<
    Parameters<ReturnType<typeof useNotifications>['show']>
  >['1']['autoHideDuration'];
}> = (props) => {
  const notifications = useNotifications();

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      notifications.show('通知', {
        severity: props.severity,
        autoHideDuration: props.autoHideDuration,
      });
    }
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Notification表示
    </Button>
  );
};

const meta = {
  /**
   * 参照しているコンポーネントのpathに必ず合わせるようにすること
   * 最初にスラッシュを入れるとエラーとなるので入れないように注意
   */
  title: 'utils/useNotifications',
  /**
   * storyの対象となるcomponentを指定
   */
  component: NotificationSampleButton,
  /**
   * 自動でドキュメントを生成。詳細は以下を参照。
   * https://storybook.js.org/docs/react/writing-docs/autodocs
   */
  tags: ['autodocs'],
  parameters: {
    /**
     * "padded", "centered", "fullscreen"
     * Storybook のデフォルトは "padded" なので理由がなければ "padded" を使う。
     */
    layout: 'centered',
    /**
     * デフォルトのビューポートを指定
     * Storybook のデフォルトは "responsive" なので理由がなければ "responsive" を使う。
     * "responsive" | "mobile" (Small mobile) | "mobile2" (Large mobile) | "tablet"
     */
    viewport: {
      defaultViewport: 'responsive',
    },
  },

  /**
   * controlを無効にしたり形式を変更したりする場面などはここを変更する
   */
  argTypes: {
    severity: {
      control: {
        type: 'radio',
      },
      options: ['info', 'success', 'warning', 'error'],
      description: '通知の種類',
      table: {
        type: { summary: 'success | warning | info' },
      },
    },
    autoHideDuration: {
      control: {
        type: 'number',
      },
      description: '通知が自動的に閉じるまでの時間（ミリ秒）',
      table: {
        type: { summary: 'number' },
      },
    },
  },
} satisfies Meta<typeof NotificationSampleButton>;

export default meta;

// StoryObj の型を定義
type Story = StoryObj<typeof meta>;

/**
 * 任意のタイミングでMaterial UIのSnackbarを表示するhookのサンプル
 *
 * 詳細は https://mui.com/toolpad/core/react-use-notifications/
 *
 *
 */
export const Default: Story = {
  /**
   * デフォルト以外の名前をつける場合は日本語でどんなストーリーかわかるように命名すること
   * サイドバーの文字数が少ないため、短い名前をつけること
   */
  name: 'Default',
  args: {
    severity: 'info',
    autoHideDuration: 2000,
  },
};
