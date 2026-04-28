import { html } from 'lit'

export interface CardProps {
  color: 'accent' | 'regjeringsbla' | 'neutral' | 'support-1' | 'support-2' | 'support-3'
  variant: 'default' | 'tinted'
  size: 'sm' | 'md' | 'lg'
  heading: string
  body: string
  footer: string
  isFormHidden: boolean
}

export function Card({
  color,
  variant = 'tinted',
  size,
  heading = 'Lykkeland Barneskole',
  body = 'Lykkeland Barneskole er ein trygg og inkluderande nærskule der leik, læring og nysgjerrigheit går hand i hand.',
  footer = 'Solslett kommune',
  isFormHidden,
}: CardProps) {
  return html`
    <div
      class="ds-card"
      data-color=${color}
      data-size=${size}
      data-variant=${variant}
    >
      <h2 class="ds-heading">${heading}</h2>
      <p class="ds-paragraph" data-variant="default">${body}</p>
      ${!isFormHidden
        ? html`
            <div class="ds-search">
              <input
                class="ds-input"
                type="search"
                placeholder=""
                aria-label="Søk"
              />
              <button
                class="ds-button"
                data-icon="true"
                data-variant="tertiary"
                type="reset"
                aria-label="Tøm"
              ></button>
              <button class="ds-button" data-variant="primary" type="submit">
                Søk
              </button>
            </div>
          `
        : html``}
      <p class="ds-paragraph" data-variant="default" data-size="xs">
        ${footer}
      </p>
    </div>
  `
}
