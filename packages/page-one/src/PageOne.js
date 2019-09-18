import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';

export class PageOne extends LitElement {
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
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.title = 'Intro';
  }

  render() {
    return html`
      <h2>${this.title} - Thinking in XState</h2>

      <p>
        There are three main concepts to grasp.
      </p>
      <ul>
        <li>States</li>
        <li>Events</li>
        <li>Transitions</li>
      </ul>

      <h3>Stoplight</h3>
      <ul>
        <li>What are the <strong>states</strong> of a stoplight?</li>
        <li>What <strong>events</strong> happen?</li>
        <li>What <strong>transitions</strong> can occur between what states?</li>
      </ul>
      <newtab-link href="https://xstate.js.org/viz/?gist=f07b56d9dfd72e808c5e5f6a779f91ca"
        >Stoplight Visualization</newtab-link
      >

      <h3>WYSIWYG</h3>
      <newtab-link href="https://xstate.js.org/viz/?gist=5c48e08292c6491ad1ab6ee7328322b0">
        WYSIWYG Editor</newtab-link
      >

      <h3>Challenge</h3>
      <p>
        We're going to model a car.
        <ul>
          <li>Track which GEAR a car is in: park, reverse, netural, drive1, drive2</li>
          <li>To avoid semantic difficulties, "shifting up" = car going faster <-------> "shifting down" = car going slower</li>
          <li>Track whether or not the pedals are accelerating, braking, or neither.</li>
          <li>Remember, you shouldn't be able to hit the gas or brake in some gears!</li>
          <li>For now, don't worry about invalid gear/pedal states - we'll tackle these a little later)</li>
        </ul>
      </p>
    `;
  }
}
