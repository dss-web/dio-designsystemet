import { html, render } from 'lit/html.js'
import { Button } from '../button/Button'

class OurWebComponent extends HTMLElement {
  private count = 0

  connectedCallback() {
    this.updateView()
  }

  handleClick() {
    this.count += 1
    this.updateView()
  }

  private updateView() {
    render(html`
      <p>Hello from our web component!</p>
      ${Button({
        text: String(this.count),
        variant: 'primary',
        onClick: () => this.handleClick(),
      })}
    `, this)
  }
}

customElements.define('our-web-component', OurWebComponent)
