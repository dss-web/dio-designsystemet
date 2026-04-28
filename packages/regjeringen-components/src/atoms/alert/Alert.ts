import { html } from 'lit'

export interface AlertProps {
  color?: 'info' | 'success' | 'warning' | 'danger'
  text: string
}

export function Alert({
  color = 'info',
  text = 'En beskjed det er viktig at brukeren ser.',
}: AlertProps) {
  return html` <div class="ds-alert" data-color=${color}>${text}</div> `
}
