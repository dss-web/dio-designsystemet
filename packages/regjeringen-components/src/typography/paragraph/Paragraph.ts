import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

export interface ParagraphProps {
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'
  text: string
}

export function Paragraph({ size, text }: ParagraphProps) {
  return html`
    <p class="ds-paragraph" data-size=${ifDefined(size)}>${text}</p>
  `
}
