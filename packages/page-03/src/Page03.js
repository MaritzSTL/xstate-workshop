import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';
import './shopping-cart.js';

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
      catalog: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Usage with LitElement';
    this.catalog = [
      { name: 'Radish Microgreens', price: 10.0 },
      { name: 'Wasabi', price: 15.0 },
      { name: 'Kale', price: 1.5 },
      { name: 'Yam', price: 0.5 },
      { name: 'Cabbage', price: 4.0 },
    ];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <ul>
        <li>Start the service in your constructor, store a reference on your component</li>
        <li>Stop the service in disconnectedCallback</li>
        <li>Set your properties inside the onTransition handler</li>
        <li>Send events directly to your service</li>
      </ul>

      <h3>Example: Shopping Cart</h3>

      <shopping-cart .catalog=${this.catalog}></shopping-cart>

      <h3>Challenge:</h3>
      <p>Build a vending machine interface.</p>
      <ul>
        <li>It can accept pennies, nickels, dimes, quarters, $1, and $5</li>
        <li>It can hold up to 6 stocked items - A1, A2, A3, B1, B2, B3</li>
        <li>There are 5 buttons: A, B, 1, 2, 3</li>
        <li>Change is returned after an item is purchased</li>
      </ul>
    `;
  }
}
