import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta = {
  title: 'Components/Divider',
  tags: ['autodocs'],
  render: () => html`
    <p class="ds-paragraph" data-size="sm">A simple horizontal rule.</p>
    <hr class="ds-divider" />
    <p class="ds-paragraph" data-size="sm">Content below the divider.</p>
  `,
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {}
