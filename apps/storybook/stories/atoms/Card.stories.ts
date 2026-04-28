import type { CardProps } from '@dss-web/regjeringen-components'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { Card } from '@dss-web/regjeringen-components'

const meta = {
  title: 'Atoms/Card',
  tags: ['autodocs'],
  render: args => Card(args),
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['accent', 'regjeringsbla', 'neutral', 'support-1', 'support-2', 'support-3'],
      defaultValue: 'accent',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'tinted'],
      defaultValue: 'tinted',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    heading: { control: 'text' },
    body: { control: 'text' },
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
    color: '#ff0000',
    variant: 'tinted',
    size: 'lg',
    heading: 'Custom Color Card',
    body: 'Custom Color Card Body',
    footer: 'Custom Color Card Footer',
  },
}
