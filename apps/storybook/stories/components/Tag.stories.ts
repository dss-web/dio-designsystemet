import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta = {
  title: 'Components/Tag',
  tags: ['autodocs'],
  render: () => html`
    <span class="ds-tag" data-color="accent">Accent</span>
    <span class="ds-tag" data-color="regjeringsbla">Regjerings-blå</span>
    <span class="ds-tag" data-color="neutral">Neutral</span>
    <span class="ds-tag" data-color="support-1">Support 1</span>
    <span class="ds-tag" data-color="support-2">Support 2</span>
    <span class="ds-tag" data-color="support-3">Support 3</span>
    <span class="ds-tag" data-color="info">Info</span>
    <span class="ds-tag" data-color="success">Success</span>
    <span class="ds-tag" data-color="warning">Warning</span>
    <span class="ds-tag" data-color="danger">Danger</span>
  `,
} satisfies Meta

export default meta
type Story = StoryObj

export const AllColors: Story = {}
