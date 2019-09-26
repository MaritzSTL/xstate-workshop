import { LitElement, html } from 'lit-element';
// eslint-disable-next-line no-unused-vars
import { interpret } from 'xstate';
// eslint-disable-next-line no-unused-vars
import { config as radioMachine } from './radioMachine.js';

export class FinishedRadio extends LitElement {
  static get properties() {
    return {
      myProp: { type: Number },
    };
  }

  constructor() {
    super();
    this.myProp = 1;
  }

  render() {
    return html`
      <h1>Radio will go here!</h1>
    `;
  }
}
