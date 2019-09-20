import { LitElement, html, css } from 'lit-element';
import { interpret } from 'xstate/es/index.js';
import { config as shoppingCartConfig } from './shoppingCartConfig.js';
import '@chameleon-ds/button';
import '@chameleon-ds/input';

export class ShoppingCart extends LitElement {
  static get properties() {
    return {
      catalog: { type: Array },
      items: { type: Array },
      last4: { type: String },
      totalCost: { type: Number },
      state: { type: Object },
    };
  }

  constructor() {
    super();
    this.catalog = [];
    this.items = [];
    /**
     * Initializing the service
     */
    this.service = interpret(shoppingCartConfig);
    this.service
      .onTransition(state => {
        this.state = state;
        this.items = state.context.items;
        this.totalCost = state.context.totalCost;
        this.last4 = state.context.creditCard.slice(-4);
        console.log(state);
      })
      .start();
  }

  disconnectedCallback() {
    this.service.stop();
  }

  handleAddItem(item) {
    const addItem = {
      type: 'ADD_ITEM',
      payload: {
        item,
      },
    };
    this.service.send(addItem);
  }

  handleQuantityChange(item, changeAmount) {
    const quantityChange = {
      type: 'UPDATE_QUANTITY',
      payload: {
        item,
        changeAmount,
      },
    };

    this.service.send(quantityChange);
  }

  handleRemoveItem(item) {
    const removeItem = {
      type: 'REMOVE_ITEM',
      payload: {
        item,
      },
    };
    this.service.send(removeItem);
  }

  handlePayNow() {
    const payNow = {
      type: 'PAY_NOW',
    };
    this.service.send(payNow);
  }

  handleInput(e) {
    const updateCreditCard = {
      type: 'UPDATE_CREDIT_CARD',
      payload: {
        value: e.target.value,
      },
    };

    this.service.send(updateCreditCard);
  }

  handleSubmit() {
    const submit = {
      type: 'SUBMIT',
    };

    this.service.send(submit);
  }

  handleCancel() {
    const cancel = {
      type: 'CANCEL',
    };

    this.service.send(cancel);
  }

  handleConfirm() {
    const confirm = {
      type: 'CONFIRM',
    };

    this.service.send(confirm);
  }

  _renderCart() {
    if (this.items.length) {
      return html`
        <h4>Your Cart</h4>
        <ul>
          ${this.items.map(
            item => html`
              <li>
                ${item.name} - Quantity: ${item.quantity} @ $${item.price}/ea
                <span class="action" @click=${() => this.handleQuantityChange(item, 1)}>+</span>
                <span class="action" @click=${() => this.handleQuantityChange(item, -1)}>-</span>
                <span class="action" @click=${() => this.handleRemoveItem(item)}>x</span>
              </li>
            `,
          )}
        </ul>
        <p>Total Balance $${this.totalCost}</p>
      `;
    }
    return html`
      <h4>Your Cart</h4>
      <p>Your cart is empty.</p>
    `;
  }

  _renderAvailableCatalog() {
    const productsAlreadyInCart = this.items.map(p => p.name);
    const availableProducts = this.catalog.filter(c => !productsAlreadyInCart.includes(c.name));

    if (availableProducts.length) {
      return html`
        <h4>Items available</h4>
        <ul>
          ${availableProducts.map(
            product => html`
              <li
                class="action"
                data-name="${product.name}"
                @click="${() => this.handleAddItem(product)}"
              >
                + ${product.name} - $${product.price}
              </li>
            `,
          )}
        </ul>
      `;
    }

    return html`
      <p>No items left to buy!</p>
    `;
  }

  _renderCheckout() {
    return html`
      <chameleon-input @input="${this.handleInput}" placeholder="Credit Card"></chameleon-input>
    `;
  }

  _renderConfirmation() {
    return html`
      <h4>Your Order</h4>
      <ul>
        ${this.items.map(
          item => html`
            <li>
              ${item.name} - Quantity: ${item.quantity} @ $${item.price}/ea
            </li>
          `,
        )}
        <p>Total Cost: $${this.totalCost}</p>
        <p>Will be charged to card ${this.last4}</p>
      </ul>
    `;
  }

  render() {
    if (this.state.matches('shopping')) {
      return html`
        ${this._renderAvailableCatalog()} ${this._renderCart()}
        <chameleon-button @click="${this.handlePayNow}">Pay Now</chameleon-button>
      `;
    }

    if (this.state.matches('checkout')) {
      return html`
        ${this._renderCheckout()}
        <chameleon-button @click="${this.handleSubmit}">Submit</chameleon-button>
        <chameleon-button @click="${this.handleCancel}">Cancel</chameleon-button>
      `;
    }

    if (this.state.matches('confirmation')) {
      return html`
        ${this._renderConfirmation()}
        <chameleon-button @click="${this.handleConfirm}">Confirm</chameleon-button>
        <chameleon-button @click="${this.handleCancel}">Cancel</chameleon-button>
      `;
    }

    if (this.state.matches('success')) {
      return html`
        <p>Congratulations! Your order has been received.</p>
      `;
    }

    return html`
      <p>There was an error.</p>
    `;
  }

  static get styles() {
    return [
      css`
        .action {
          cursor: pointer;
        }

        .action:hover {
          color: grey;
        }
      `,
    ];
  }
}
