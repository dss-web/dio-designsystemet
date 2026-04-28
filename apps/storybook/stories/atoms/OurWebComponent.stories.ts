import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '@dss-web/regjeringen-components/register'

const meta = {
  title: 'Atoms/Our web component',
  tags: ['autodocs'],
  component: 'our-web-component',
  render: () => html`
    <our-web-component></our-web-component>
  `,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {}
