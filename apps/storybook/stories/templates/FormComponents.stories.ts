import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

import './FormComponents.css'

const meta = {
  title: 'Templates/Form Components',
  tags: ['autodocs'],
  render: () => html`
    <div class="demo-form">
      <div class="ds-field">
        <label class="ds-label" for="sb-name-input">Textfield</label>
        <p class="ds-field__description">Enter your full name</p>
        <input
          class="ds-input"
          type="text"
          id="sb-name-input"
          placeholder="Ola Nordmann"
        />
      </div>

      <div class="ds-field">
        <label class="ds-label" for="sb-email-input">Textfield (invalid)</label>
        <div data-field="description">
          Etternavn kan ikke inneholde mellomrom
        </div>
        <input
          id="sb-email-input"
          aria-invalid="true"
          class="ds-input"
          type="text"
          value="Nordmann Svenske"
        />
        <p class="ds-validation-message" data-field="validation">
          Du kan ikke ha mellomrom i etternavnet ditt
        </p>
      </div>

      <div class="ds-field">
        <label class="ds-label" data-weight="medium" for="my-textarea">
          Textarea
        </label>
        <textarea class="ds-input" id="my-textarea"></textarea>
      </div>

      <div class="ds-field">
        <label class="ds-label" data-weight="medium">Select</label>
        <select class="ds-input">
          <option value="" disabled="" selected="">Velg et fjell …</option>
          <option value="everest">Mount Everest</option>
          <option value="aconcagua">Aconcagua</option>
          <option value="denali">Denali</option>
          <option value="kilimanjaro">Kilimanjaro</option>
          <option value="elbrus">Elbrus</option>
          <option value="vinson">Mount Vinson</option>
          <option value="puncakjaya">Puncak Jaya</option>
          <option value="kosciuszko">Mount Kosciuszko</option>
        </select>
      </div>

      <ds-field class="ds-field">
        <label class="ds-label" data-weight="medium">Suggestion</label>
        <ds-suggestion class="ds-suggestion">
          <input class="ds-input" type="text" placeholder="" />
          <del aria-label="Tøm" hidden=""></del>
          <u-datalist
            data-nofilter=""
            data-sr-plural="%d forslag"
            data-sr-singular="%d forslag"
            popover="manual"
            role="listbox"
          >
            <u-option label="Sogndal" value="Sogndal">
              Sogndal
              <div>Kommune</div>
            </u-option>
            <u-option label="Oslo" value="Oslo">
              Oslo
              <div>Kommune</div>
            </u-option>
            <u-option label="Brønnøysund" value="Brønnøysund">
              Brønnøysund
              <div>Kommune</div>
            </u-option>
            <u-option label="Stavanger" value="Stavanger">
              Stavanger
              <div>Kommune</div>
            </u-option>
            <u-option label="Trondheim" value="Trondheim">
              Trondheim
              <div>Kommune</div>
            </u-option>
            <u-option label="Bergen" value="Bergen">
              Bergen
              <div>Kommune</div>
            </u-option>
            <u-option label="Lillestrøm" value="Lillestrøm">
              Lillestrøm
              <div>Kommune</div>
            </u-option>
          </u-datalist>
        </ds-suggestion>
      </ds-field>

      <fieldset class="ds-fieldset">
        <legend class="ds-label" data-weight="medium">Fieldset (radio)</legend>
        <p class="ds-paragraph" data-variant="default">
          Valget vil hjelpe oss å forbedre innholdet vi viser deg.
        </p>
        <ds-field class="ds-field">
          <input
            class="ds-input"
            type="radio"
            name="radio"
            value="barsnesfjorden"
          />
          <label class="ds-label" data-weight="regular">Barsnesfjorden</label>
        </ds-field>
        <ds-field class="ds-field">
          <input
            class="ds-input"
            type="radio"
            name="radio"
            value="eidsfjorden"
          />
          <label class="ds-label" data-weight="regular">Eidsfjorden</label>
        </ds-field>
        <ds-field class="ds-field">
          <input
            class="ds-input"
            type="radio"
            name="radio"
            value="ingen-av-de"
          />
          <label class="ds-label" data-weight="regular">Ingen av de</label>
        </ds-field>
      </fieldset>

      <fieldset class="ds-fieldset">
        <legend class="ds-label" data-weight="medium">
          Fieldset (checkbox)
        </legend>
        <ds-field class="ds-field">
          <input class="ds-input" type="checkbox" value="value" />
          <label class="ds-label" data-weight="regular">Checkbox label</label>
          <div data-field="description">Checkbox description</div>
        </ds-field>
      </fieldset>

      <ds-field class="ds-field">
        <input class="ds-input" type="checkbox" role="switch" />
        <label class="ds-label" data-weight="regular">Switch</label>
      </ds-field>
    </div>
  `,
} satisfies Meta

export default meta
type Story = StoryObj

export const Showcase: Story = {}
