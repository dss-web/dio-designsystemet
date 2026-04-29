import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '@dss-web/regjeringen-components/register'

interface CookieClickerArgs {
  initialCount: number
}

const meta = {
  title: 'Components/CookieClicker',
  component: 'dio-cookie-clicker',
  render: (args: CookieClickerArgs) => html`
  <dio-cookie-clicker data-initial-count=${args.initialCount}>
    <button class="ds-button">Click me</button>
  </dio-cookie-clicker>
  `,
  argTypes: {
    initialCount: { control: 'number' },
  },
} satisfies Meta<CookieClickerArgs>

export default meta

type Story = StoryObj<CookieClickerArgs>

export const Default: Story = {
  args: {
    initialCount: 0,
  },
}
