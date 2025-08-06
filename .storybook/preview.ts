import '../src/app/globals.css'; // ✅ Import Tailwind styles

import type { Preview } from '@storybook/nextjs-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo'  - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off'   - skip a11y checks entirely
      test: 'todo',
    },
    layout: 'centered', // Optional: center components by default
  },
}

export default preview
