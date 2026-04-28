import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta = {
  title: 'Atoms/Spinner',
  tags: ['autodocs'],
  render: () => html`
    <svg
      aria-label="Henter kaffi"
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
    >
      <circle
        class="ds-spinner__background"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
      <circle
        class="ds-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  `,
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {}
