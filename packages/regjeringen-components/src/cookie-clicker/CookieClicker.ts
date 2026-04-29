export class CookieClicker extends HTMLElement {
  private count = 0
  private buttonEl: HTMLButtonElement | null = null

  connectedCallback() {
    this.buttonEl = this.querySelector('button')
    this.buttonEl?.addEventListener('click', this.handleClick.bind(this))
    this.render()
  }

  handleClick() {
    this.count += 1
    this.render()
  }

  render() {
    if (this.buttonEl) {
      this.buttonEl.textContent = String(this.count)
    }
  }
}
