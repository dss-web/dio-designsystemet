import type { ButtonProps } from '@dss-web/regjeringen-components'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { Button } from '@dss-web/regjeringen-components'

const meta = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  render: args => Button(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      defaultValue: 'primary',
    },
    color: {
      control: { type: 'select' },
      options: ['accent', 'regjeringsbla', 'neutral', 'support-1', 'support-2', 'support-3'],
      defaultValue: 'accent',
    },
    disabled: { control: 'boolean', defaultValue: false },
    loading: { control: 'boolean', defaultValue: false },
    text: { control: 'text' },
  },
} satisfies Meta<ButtonProps>

export default meta
type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  args: {
    variant: 'primary',
    text: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary Button',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary Button',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    text: 'Laster...',
  },
}
