import type { AlertProps } from '@dss-web/regjeringen-components'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { Alert } from '@dss-web/regjeringen-components'

const meta = {
  title: 'Atoms/Alert',
  tags: ['autodocs'],
  render: args => Alert(args),
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      defaultValue: 'info',
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
