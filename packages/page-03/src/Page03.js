import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';

export class Page03 extends LitElement {
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
    this.title = 'Usage with LitElement';
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      Starting the service | Stopping when done | Sending Events | Updating State
    `;
  }
}
