import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { CardProps } from './Card'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  render: args => Card(args),
  args: {
    color: 'accent',
    variant: 'tinted',
    size: 'md',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['accent', 'regjeringsbla', 'neutral', 'support-1', 'support-2', 'support-3'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'tinted'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    heading: { control: 'text' },
    body: { control: 'text' },
    isFormHidden: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<CardProps>

export default meta
type Story = StoryObj<CardProps>

export const Default: Story = {
  args: {
    isFormHidden: true,
  },
}

export const Small: Story = {
  args: {
    color: 'neutral',
    variant: 'tinted',
    size: 'sm',
    heading: 'Neutral Card',
    body: 'Neutral Card Body',
    footer: 'Neutral Card Footer',
  },
}

export const Medium: Story = {
  args: {
    color: 'accent',
    variant: 'tinted',
    size: 'md',
    heading: 'Accent Card',
    body: 'Accent Card Body',
    footer: 'Accent Card Footer',
  },
}

export const Large: Story = {
  args: {
    color: 'support-1',
    variant: 'tinted',
    size: 'lg',
    heading: 'Support 1 Card',
    body: 'Support 1 Card Body',
    footer: 'Support 1 Card Footer',
  },
}
