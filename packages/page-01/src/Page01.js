import { html, css, LitElement } from 'lit-element';
import '@ui5/webcomponents/dist/Panel.js';
import '../../newtab-link/newtab-link.js';
import '../../prism-snippet/prism-snippet.js';

export class Page01 extends LitElement {
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
    this.title = 'Thinking in XState';
  }

  render() {
    return html`
      <h2>${this.title}</h2>

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

      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Stoplight Machine'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
          <code>
        const lightMachine = Machine({
          id: 'light',
          initial: 'green',
          type: 'compound',
          states: {
            green: {
              on: {
                TIMER: 'yellow'
              }
            },
            yellow: {
              on: {
                TIMER: 'red'
              }
            },
            red: {
              on: {
                TIMER: 'green'
              }
            }
          }
        });
        </code>
        </prism-snippet>
      </ui5-panel>
      <newtab-link href="https://xstate.js.org/viz/?gist=f07b56d9dfd72e808c5e5f6a779f91ca"
        >Stoplight Visualization</newtab-link
      >

      <h3>WYSIWYG</h3>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'WYSIWYG Controls'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
          <code>
          const wordMachine = Machine({
          id: 'word',
          type: 'parallel',
          states: {
            bold: {
              initial: 'off',
              states: {
                on: {
                  on: { TOGGLE_BOLD: 'off' }
                },
                off: {
                  on: { TOGGLE_BOLD: 'on' }
                }
              }
            },
            underline: {
              initial: 'off',
              states: {
                on: {
                  on: { TOGGLE_UNDERLINE: 'off' }
                },
                off: {
                  on: { TOGGLE_UNDERLINE: 'on' }
                }
              }
            },
            italics: {
              initial: 'off',
              states: {
                on: {
                  on: { TOGGLE_ITALICS: 'off' }
                },
                off: {
                  on: { TOGGLE_ITALICS: 'on' }
                }
              }
            },
            list: {
              initial: 'none',
              states: {
                none: {
                  on: { BULLETS: 'bullets', NUMBERS: 'numbers' }
                },
                bullets: {
                  on: { NONE: 'none', NUMBERS: 'numbers' }
                },
                numbers: {
                  on: { BULLETS: 'bullets', NONE: 'none' }
                }
              }
            }
          }
        });
        </code>
        </prism-snippet>
      </ui5-panel>
      <newtab-link href="https://xstate.js.org/viz/?gist=5c48e08292c6491ad1ab6ee7328322b0">
        WYSIWYG Editor</newtab-link
      >

      <h3>Events, Transitions, States</h3>
      <p>
        The key thing to remember is that "state" is always contextual. When people say "state,"
        what they usually mean is "of all the possibilities this other thing we're talking about
        could exist in, which possibilities are currently happening?"
      </p>
      <p>
        "State" represents a particular system configuration at a certain point in time. The only
        way to change state is to send an event.
      </p>
      <p>
        An event can cause a "transition." Events don't always cause transitions. When they do,
        transitions are the only way to change from one state to another.
      </p>

      <h3>Challenge</h3>
      <p>
        We're going to model a car.
      </p>
      <ul>
        <li>Track which GEAR a car is in: park, reverse, netural, drive1, drive2</li>
        <li>
          To avoid semantic difficulties, "shifting up" = car going faster, "shifting down" = car
          going slower
        </li>
        <li>Track whether or not the pedals are being pressed in or not.</li>
        <li>
          For now, don't worry about invalid gear/pedal states that would destroy the car irl -
          we'll tackle these a little later)
        </li>
      </ul>
    `;
  }
}
