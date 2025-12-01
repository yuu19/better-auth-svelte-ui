import type { Meta, StoryObj } from '@storybook/svelte';

import SignedIn from '$lib/components/SignedIn.svelte';

const meta = {
  title: 'Auth/SignedIn',
  component: SignedIn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof SignedIn>;

export default meta;

type Story = StoryObj<typeof meta>;

const protectedSlot = {
  default: 'This content is only visible when a session is available.'
};

export const WithSession: Story = {
  name: 'With provided session prop',
  args: {
    session: {
      userId: 'user_123',
      email: 'user@example.com'
    }
  },
  render: (args) => ({
    Component: SignedIn,
    props: args,
    slots: protectedSlot
  })
};

export const WithoutSession: Story = {
  name: 'Hidden without session',
  args: {
    session: null
  },
  render: (args) => ({
    Component: SignedIn,
    props: args,
    slots: protectedSlot
  }),
  parameters: {
    docs: {
      description: {
        story: 'SignedIn renders nothing when the session is missing.'
      }
    }
  }
};
