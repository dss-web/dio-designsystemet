import type { Meta, StoryObj } from '@storybook/web-components-vite'
import type { AlertProps } from './Alert'
import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  render: args => Alert(args),
  args: {
    color: 'info',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
    },
    text: { control: 'text' },
  },
} satisfies Meta<AlertProps>

export default meta
type Story = StoryObj<AlertProps>

export const Info: Story = {
  args: {
    color: 'info',
    text: 'En beskjed det er viktig at brukeren ser.',
  },
}

export const Success: Story = {
  args: {
    color: 'success',
    text: 'En beskjed det er viktig at brukeren ser.',
  },
}

export const Warning: Story = {
  args: {
    color: 'warning',
    text: 'En beskjed det er viktig at brukeren ser.',
  },
}

export const Danger: Story = {
  args: {
    color: 'danger',
    text: 'En beskjed det er viktig at brukeren ser.',
  },
}
