import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';
import './shopping-cart.js';
import '../challenge/finished.js';

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
      <h4>
        Start the service in your constructor or appropriate "beginning of component lifecycle"
        event, store a reference on your component
      </h4>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Starting the service'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
          <code>
            import {LitElement} from "lit-element";
            import {interpret} from "xstate";
            import {myMachine} from "./myMachine.js"

            class MyElement extends LitElement {
              constructor() {
                super();
                this.service = interpret(myMachine).start();
              }
            }
          </code>
        </prism-snippet>
      </ui5-panel>

      <h4>
        Stop the service in disconnectedCallback or appropriate "before component leaves page"
        callback
      </h4>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Stopping the service'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
          <code>
            /** snip! */

            class MyElement extends LitElement {
              /** snip! */

              disconnectedCallback() {
                super.disconnectedCallback();
                this.service.stop();
              }
            }
          </code>
        </prism-snippet>
      </ui5-panel>

      <h4>Set your properties inside the onTransition handler</h4>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Updating your component state'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
          <code>
            /** snip! */

            class MyElement extends LitElement {
              static get properties() {
                return {
                  amount: {type: Number},
                  mode: {type: String}
                }
              }

              constructor() {
                super();
                this.service = interpret(myMachine).
                  .onTransition(state => {
                    this.amount = state.context.amount;
                    this.mode = state.value;
                  })
                  // It's a good idea to set your handler before you call start()
                  // so xstate will hydrate your component with it's initial state!
                  .start();
              }

              /** snip! */
            }
          </code>
        </prism-snippet>
      </ui5-panel>

      <h4>Send events directly to your service</h4>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Sending Events'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
          <code>
            /** snip! */

            class MyElement extends LitElement {
              /** snip! */

              handleClick() {
                const event = {
                  type: "INCREMENT_COUNTER",
                  amount: 3,
                }
                this.service.send(event);
              }

              /** snip! */
            }

          </code>
        </prism-snippet>
      </ui5-panel>

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

      <h3>Result</h3>
      <finished-radio></finished-radio>
    `;
  }
}
