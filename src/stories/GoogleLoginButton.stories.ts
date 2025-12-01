import type { Meta, StoryObj } from '@storybook/svelte';

import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';

const meta = {
  title: 'Auth/GoogleLoginButton',
  component: GoogleLoginButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof GoogleLoginButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Continue with Google'
  }
};

export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const WithAsyncHandler: Story = {
  name: 'With async onLogin',
  render: () => ({
    Component: GoogleLoginButton,
    props: {
      label: 'Sign in with Google',
      onLogin: async () => new Promise((resolve) => setTimeout(resolve, 1200))
    }
  })
};
