import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

const meta = {
  title: 'Typography/Sizes',
  tags: ['autodocs'],
  render: () => html`
   <div>
    <div class="ds-card" data-size="auto">
      <p class="ds-paragraph" data-size="xl">XL paragraph in AUTO container</p>
      <p class="ds-paragraph" data-size="md">MD paragraph in AUTO container</p>
      <p class="ds-paragraph" data-size="xs">XS paragraph in AUTO container</p>
    </div>
    <hr aria-hidden="true" class="ds-divider"/>
    <div data-size="sm">
      <p class="ds-paragraph" data-size="xl">XL paragraph in SM container</p>
      <p class="ds-paragraph" data-size="md">MD paragraph in SM container</p>
      <p class="ds-paragraph" data-size="xs">XS paragraph in SM container</p>
    </div>
    <hr aria-hidden="true" class="ds-divider"/>
    <div class="ds-card" data-size="md">
      <p class="ds-paragraph" data-size="xl">XL paragraph in MD container</p>
      <p class="ds-paragraph" data-size="md">MD paragraph in MD container</p>
      <p class="ds-paragraph" data-size="xs">XS paragraph in MD container</p>
    </div>
    <hr aria-hidden="true" class="ds-divider"/>
    <div data-size="lg">
      <p class="ds-paragraph" data-size="xl">XL paragraph in LG container</p>
      <p class="ds-paragraph" data-size="md">MD paragraph in LG container</p>
      <p class="ds-paragraph" data-size="xs">XS paragraph in LG container</p>
    </div>
  </div>
  `,
} satisfies Meta

export default meta
type Story = StoryObj

export const Sizes: Story = {}
