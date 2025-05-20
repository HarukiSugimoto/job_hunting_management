import type { Preview } from '@storybook/react';
import { withMuiProvider } from './decorators/muiProvider';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#121212' },
        { name: 'Light', value: '#f5f5f5' },
        { name: 'White', value: '#ffffff' },
      ],
      default: 'White',
    },
  },
  decorators: [withMuiProvider],
};

export default preview;
