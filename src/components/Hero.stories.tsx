// src/components/Hero.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Marketing/Hero',
  component: Hero,
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Basic: Story = {
  args: {
    title: 'Welcome to Skyridge Ventures',
    subtitle: 'Helping businesses grow with modern web platforms.',
  },
};
