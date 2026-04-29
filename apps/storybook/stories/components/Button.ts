import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  color?: 'accent' | 'regjeringsbla' | 'neutral' | 'support-1' | 'support-2' | 'support-3'
  loading?: boolean
  text: string
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  variant = 'primary',
  color = 'accent',
  loading,
  text,
  onClick,
  disabled,
}: ButtonProps) {
  return html`
    <button
      class="ds-button"
      data-variant=${variant}
      data-color=${color}
      type="button"
      aria-busy=${ifDefined(loading)}
      aria-disabled=${ifDefined(loading)}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${text}
    </button>
  `
}
