import { LitElement, html } from 'lit-element';
import '@chameleon-ds/button';
import '@chameleon-ds/input';
import { interpret } from 'xstate/es/index.js';
import { wizardMachine } from './wizardMachine.js';

export class ShortWizard extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      answer: { type: String },
      tocAccepted: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.service = interpret(wizardMachine)
      .onTransition(state => {
        this.state = state;
        this.answer = state.context.answer;
        this.tocAccepted = state.context.tocAccepted;
      })
      .start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.stop();
  }

  handleNext() {
    this.service.send('NEXT');
  }

  handleBack() {
    this.service.send('BACK');
  }

  handleToggle() {
    this.service.send('TOGGLE');
  }

  handleInput(e) {
    const input = {
      type: 'INPUT',
      payload: {
        value: e.target.value,
      },
    };
    this.service.send(input);
  }

  render() {
    if (this.state.matches('welcome')) {
      return html`
        <p>Welcome!</p>
        <chameleon-button @click="${this.handleNext}">Next</chameleon-button>
      `;
    }
    if (this.state.matches('question')) {
      return html`
        <p>Do you like... shrimps?</p>
        <chameleon-input @input="${this.handleInput}"></chameleon-input>
        <chameleon-button @click="${this.handleBack}">Back</chameleon-button>
        <chameleon-button @click="${this.handleNext}">Next</chameleon-button>
      `;
    }
    if (this.state.matches('toc')) {
      return html`
        <input type="checkbox" @click="${this.handleToggle}" id="tocAcceptetd" />
        <label for="tocAccepted">Accept TOC - YOUR SOUL IS MINE!!!</label>
        <chameleon-button @click="${this.handleBack}">Back</chameleon-button>
        <chameleon-button @click="${this.handleNext}">Next</chameleon-button>
      `;
    }
    if (this.state.matches('success')) {
      return html`
        <p>Congratulations. You did it.</p>
        <chameleon-button @click="${this.handleBack}">Back</chameleon-button>
      `;
    }

    return ``;
  }
}
