export interface CookieClickerProps {
  initialCount: number
}

export class CookieClicker extends HTMLElement {
  private count: number
  private buttonEl: HTMLButtonElement | null = null

  static observedAttributes = ['data-initial-count']
  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case 'data-initial-count':
        this.count = Number.parseInt(newValue || '0')
        this.render()
        break
    }
  }

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
