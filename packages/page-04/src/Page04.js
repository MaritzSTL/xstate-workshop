import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';
import './short-wizard.js';

export class Page04 extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Testing';
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <p>See packages/page-04/test for how-to's</p>

      <short-wizard></short-wizard>
    `;
  }
}
