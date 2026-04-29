import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '@dss-web/regjeringen-components/register'

const meta = {
  title: 'Components/CookieClicker',
  tags: ['autodocs'],
  component: 'dio-cookie-clicker',
  render: () => html`
  <dio-cookie-clicker>
    <button class="ds-button">Click me</button>
  </dio-cookie-clicker>
  `,
} satisfies Meta<typeof html>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
