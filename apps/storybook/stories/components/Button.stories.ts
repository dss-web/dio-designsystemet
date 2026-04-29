import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { ButtonProps } from './Button'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: args => Button(args),
  args: {
    variant: 'primary',
    color: 'accent',
    disabled: false,
    loading: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    color: {
      control: { type: 'select' },
      options: ['accent', 'regjeringsbla', 'neutral', 'support-1', 'support-2', 'support-3'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
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
