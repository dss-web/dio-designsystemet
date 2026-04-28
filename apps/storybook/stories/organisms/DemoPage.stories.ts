import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import './DemoPage.css'

function toggleScheme() {
  const root = document.documentElement
  const next
    = root.getAttribute('data-color-scheme') === 'dark' ? 'light' : 'dark'
  root.setAttribute('data-color-scheme', next)
}

const meta = {
  title: 'Organisms/Demo page',
  render: () => html`
    <div class="demo-page">
      <header class="demo-page__header">
        <h1 class="ds-heading" data-size="xl">Designsystemet Demo</h1>
        <p class="ds-paragraph" data-size="lg">
          A live preview of your design tokens applied to Designsystemet
          components.
        </p>
        <div class="demo-page__scheme-toggle">
          <button
            class="ds-button"
            data-variant="secondary"
            data-color="neutral"
            data-size="sm"
            type="button"
            @click=${toggleScheme}
          >
            Toggle dark / light mode
          </button>
        </div>
      </header>

      <section class="demo-page__section">
        <h2 class="ds-heading" data-size="md">Color Palette</h2>
        <p class="ds-paragraph" data-size="sm">
          Generated from your <code>designsystemet.config.json</code> theme
          colors.
        </p>
        <h3 class="ds-heading" data-size="xs">Accent</h3>
        <div class="demo-page__swatches" data-color="accent">
          <div
            class="demo-page__swatch"
            style="background: var(--ds-color-accent-background-tinted)"
          >
            <span>bg tinted</span>
          </div>
          <div
            class="demo-page__swatch"
            style="background: var(--ds-color-accent-surface-default); border: 1px solid var(--ds-color-accent-border-subtle)"
          >
            <span>surface</span>
          </div>
          <div
            class="demo-page__swatch"
            style="background: var(--ds-color-accent-surface-hover)"
          >
            <span>surface hover</span>
          </div>
          <div
            class="demo-page__swatch"
            style="background: var(--ds-color-accent-border-default)"
          >
            <span>border</span>
          </div>
          <div
            class="demo-page__swatch"
            style="background: var(--ds-color-accent-base-default); color: var(--ds-color-accent-base-contrast-default)"
          >
            <span>base</span>
          </div>
        </div>
      </section>

      <section class="demo-page__section">
        <h2 class="ds-heading" data-size="md">Buttons</h2>
        <div class="demo-page__row">
          <button class="ds-button" data-color="accent" type="button">
            Primary
          </button>
          <button
            class="ds-button"
            data-variant="secondary"
            data-color="accent"
            type="button"
          >
            Secondary
          </button>
          <button
            class="ds-button"
            data-variant="tertiary"
            data-color="accent"
            type="button"
          >
            Tertiary
          </button>
        </div>
      </section>

      <section class="demo-page__section">
        <h2 class="ds-heading" data-size="md">Typography</h2>
        <div class="demo-page__typography-grid">
          <div>
            <h3 class="ds-heading" data-size="md">Heading MD</h3>
            <h3 class="ds-heading" data-size="sm">Heading SM</h3>
          </div>
          <div>
            <p class="ds-paragraph" data-size="md">
              Body MD — The quick brown fox jumps.
            </p>
            <p class="ds-paragraph" data-size="sm">
              Body SM — The quick brown fox jumps.
            </p>
          </div>
        </div>
      </section>

      <section class="demo-page__section">
        <h2 class="ds-heading" data-size="md">Form</h2>
        <div class="demo-form-grid">
          <div class="ds-field">
            <label class="ds-label" for="sb-demo-name">Name</label>
            <input
              class="ds-input"
              type="text"
              id="sb-demo-name"
              placeholder="Ola Nordmann"
            />
          </div>
          <div class="ds-field" data-type="checkbox">
            <input
              class="ds-switch"
              type="checkbox"
              id="sb-demo-switch"
              role="switch"
            />
            <label class="ds-label" for="sb-demo-switch">Option</label>
          </div>
        </div>
      </section>

      <section class="demo-page__section">
        <h2 class="ds-heading" data-size="md">Alerts</h2>
        <div class="demo-page__alerts">
          <div class="ds-alert" data-color="info">Info alert.</div>
          <div class="ds-alert" data-color="danger">Danger alert.</div>
        </div>
      </section>

      <section class="demo-page__section">
        <h2 class="ds-heading" data-size="md">Tags</h2>
        <div class="demo-page__row">
          <span class="ds-tag" data-color="accent">Accent</span>
          <span class="ds-tag" data-color="success">Success</span>
        </div>
      </section>

      <footer class="demo-page__footer">
        <p class="ds-paragraph" data-size="xs">
          Tokens defined in <code>designsystemet.config.json</code> · Components
          from <code>@digdir/designsystemet-css</code> · Behaviors from
          <code>@digdir/designsystemet-web</code>
        </p>
      </footer>
    </div>
  `,
} satisfies Meta

export default meta
type Story = StoryObj

export const CompactOverview: Story = {}
