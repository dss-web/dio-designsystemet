import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import '@dss-web/regjeringen-components/register'

interface OurCustomElementArgs {
  count: number
}

const meta = {
  title: 'Components/Our custom element',
  tags: ['autodocs'],
  component: 'dio-our-custom-element',
  render: (args: OurCustomElementArgs) => html`
    <dio-our-custom-element .count=${args.count}>
      <h1>Regjeringen design system</h1>
    </dio-our-custom-element>
  `,
  argTypes: {
    count: { control: { type: 'number', min: 0, step: 1 } },
  },
  args: {
    count: 0,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<OurCustomElementArgs>

export default meta
type Story = StoryObj<OurCustomElementArgs>

export const Default: Story = {}

export const WithCount: Story = {
  args: { count: 12 },
}
