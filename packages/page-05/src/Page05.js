import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';

export class Page05 extends LitElement {
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
    this.title = 'Thinking in Actors';
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      Spawning new Actors | Kinds of Events/Conventions | Reactive Communication Patterns | Testing
    `;
  }
}
