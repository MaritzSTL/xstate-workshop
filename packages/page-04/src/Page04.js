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
      You can:
      <ul>
        <li>Test your machine in isolation</li>
        <li>And/or test your full component</li>
      </ul>
      For lots of great examples, check out
      <newtab-link href="https://github.com/davidkpiano/xstate/tree/master/test"
        >XState tests</newtab-link
      >
      (Check out the machine tests)
      <p>See packages/page-04/test for how-to's testing the following:</p>
      <br />
      <short-wizard></short-wizard>
    `;
  }
}
