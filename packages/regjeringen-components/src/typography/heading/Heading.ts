import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

export interface HeadingProps {
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'
  text: string
}

export function Heading({ size, text }: HeadingProps) {
  return html`
    <h1 class="ds-heading" data-size=${ifDefined(size)}>${text}</h1>
  `
}
