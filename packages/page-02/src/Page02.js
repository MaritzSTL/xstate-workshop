import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';
import '@ui5/webcomponents/dist/Panel.js';
import '../../prism-snippet/prism-snippet.js';

export class Page02 extends LitElement {
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
    this.title = 'Placing State';
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <p>In XState, you can store information in two places:</p>
      <ul>
        <li>Inside the state graph, like we did in part one, or</li>
        <li>Inside Context</li>
      </ul>

      <h3>What's context?</h3>
      <p>To quote the docs:</p>
      <blockquote>
        <p>
          While finite states are well-defined in finite state machines and statecharts, state that
          represents quantitative data (e.g., arbitrary strings, numbers, objects, etc.) that can be
          potentially infinite is represented as extended state instead. This makes statecharts much
          more useful for real-life applications.
        </p>
        <p>
          In XState, extended state is known as context.
        </p>
      </blockquote>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Water Glass Example'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
           <code>
            const addWater = assign({
              amount: (context, event) => context.amount + 1
            });

            // Guard to check if the glass is full
            function glassIsFull(context, event) {
              return context.amount >= 10;
            }

            const glassMachine = Machine(
              {
                id: 'glass',
                // the initial context (extended state) of the statechart
                context: {
                  amount: 0
                },
                initial: 'empty',
                states: {
                  empty: {
                    on: {
                      FILL: {
                        target: 'filling',
                        actions: 'addWater'
                      }
                    }
                  },
                  filling: {
                    on: {
                      // Transient transition
                      '': {
                        target: 'full',
                        cond: 'glassIsFull'
                      },
                      FILL: {
                        target: 'filling',
                        actions: 'addWater'
                      }
                    }
                  },
                  full: {}
                }
              },
              {
                actions: { addWater },
                guards: { glassIsFull }
              }
            );
          </code>
        </prism-snippet>
      </ui5-panel>
      <newtab-link href="https://xstate.js.org/docs/guides/context.html#context"
        >Filling Water Glass Example</newtab-link
      >
      <h3>
        Actions
      </h3>
      <p>
        Actions are the way we can update context. Actions only occur in response to events, either
        directly, or as the result of a transition.
      </p>
      <h3>
        Action Order
      </h3>
      <p>What do you predict these sequences will be?</p>
      <p>Action Aerobics: all the different ways you can declare them</p>
      <p>Transmitting information inside events</p>
      <newtab-link href="https://xstate.js.org/viz/?gist=ee5e0c015a4697325367a2b9053ffb94"
        >Multiply Machine</newtab-link
      >
      <p>
        Remember (disclaimer from docs): Never mutate the machine's context externally. Everything
        happens for a reason, and every context change should happen explicitly due to an event.
      </p>

      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Updater as an Object'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
           <code>
            import { Machine, assign } from 'xstate';
            // example: property updater

            // ...
              actions: assign({
                // increment the current count by the event value
                count: (context, event) => context.count + event.value,

                // update the message statically (no function needed)
                message: 'Count changed'
              }),
            // ...
           </code>
        </prism-snippet>
      </ui5-panel>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Updater as a Function'}"
      >
        <prism-snippet>
          <!-- prettier-ignore -->
           <code>
           // example: context updater

            // ...

              // return a partial (or full) updated context
              actions: assign((context, event) => ({
                count: context.count + event.value,
                message: 'Count changed'
              })),
            // ...
           </code>
        </prism-snippet>
      </ui5-panel>
      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Inline Action'}"
      >
        Either of these two approaches can be used inline:
        <prism-snippet>
          <!-- prettier-ignore -->
           <code>
           on: {
             ADD_AMOUNT: {
               target: "someState",
               actions: [assign((ctx, e) => ({amount: ctx.amount + e.amount}))]
             }
           }
           </code>
        </prism-snippet>
      </ui5-panel>
      <h3> Guards </h4>
      <p>From the docs:</p>
      <blockquote>
        <p>
          Many times, you'll want a transition between states to only take place if certain conditions on the state (finite or extended) or the event are met. For instance, let's say you're creating a machine for a search form, and you only want search to be allowed if:
        </p>
        <ul>
          <li> the user is allowed to search (.canSearch in this example) </li>
          <li> the search event query is not empty. </li>
        </ul>
        <p>This is a good use case for a "transition guard", which determines if a transition can occur given the state and the event. A transition with guards is called a conditional transition.
      </blockquote>
      <newtab-link href="https://xstate.js.org/docs/guides/guards.html#guard-functions">Guards</newtab-link>

      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Declaring a Guard'}"
      >
        Either of these two approaches can be used inline:
        <prism-snippet>
          <!-- prettier-ignore -->
           <code>
            import { Machine } from 'xstate';

            const searchMachine = Machine(
              {
                id: 'search',
                initial: 'idle',
                context: {
                  canSearch: true
                },
                states: {
                  idle: {
                    on: {
                      SEARCH: {
                        target: 'searching',
                        // Only transition to 'searching' if the guard (cond) evaluates to true
                        cond: 'searchValid' // or { type: 'searchValid' }
                      }
                    }
                  },
                  searching: {
                    entry: 'executeSearch'
                    // ...
                  },
                  searchError: {
                    // ...
                  }
                }
              },
              {
                guards: {
                  searchValid: (context, event) => {
                    return context.canSearch && event.query && event.query.length > 0;
                  }
                }
              }
            );

           </code>
        </prism-snippet>
      </ui5-panel>

      <h3>Transient Transitions</h3>
      <p>If you're ever in a situation where you need to make a decision based on some information you don't get ahead of time, it's often useful to use a "transient transition".</p>
      <p>This is a transition which occurs immediately as long as any conditions are met. A simple example: maybe you want to pipe a form from "valid" into "validating," then immediately resolve to "invalid" or "valid" depending on the state of the form.</p>
      <p>Transient transitions are super useful to combine with guards, and notions of "-ing" states where exactly where you are is in flight.</p>
      <newtab-link href="https://xstate.js.org/docs/guides/transitions.html#transient-transitions">Transient Transitions</newtab-link>

      <ui5-panel
        accessible-role="Complementary"
        class="full-width"
        .collapsed=${true}
        .headerText="${'Declaring a Transient Transition'}"
      >
        Either of these two approaches can be used inline:
        <prism-snippet>
          <!-- prettier-ignore -->
           <code>
          const timeOfDayMachine = Machine({
            id: 'timeOfDay',
            initial: 'unknown',
            context: {
              time: undefined
            },
            states: {
              // Transient state
              unknown: {
                on: {
                  '': [
                    { target: 'morning', cond: 'isBeforeNoon' },
                    { target: 'afternoon', cond: 'isBeforeSix' },
                    { target: 'evening' }
                  ]
                }
              },
              morning: {},
              afternoon: {},
              evening: {}
            }
          }, {
            guards: {
              isBeforeNoon: // ...
              isBeforeSix: // ...
            }
          });

           </code>
        </prism-snippet>
      </ui5-panel>

      <h3>Challenge</h3>
      <p>We're going to model the movement of a car.</p>
      <ul>
        <li>Speed and gas start at 0.</li>
        <li>'accelerate' will increase the speed by 1, and use up 1 gas. You can only accelerate if you have gas.</li>
        <li>'decelerate' will decrease the speed by 2.</li>
        <li>'coast' will decrease the speed by 1 and use up no gas.</li>
        <li>speedChanging will resolve to stationary, if speed is zero, or moving, if speed is more than zero.</li>
        <li><strong>Bonus:</strong> you can supply custom amounts when you GAS and BRAKE to represent how hard you push the pedal</li>
        <li><strong>Bonus:</strong> speed and gas shouldn't be able to drop below 0!</li>
      </ul>
    `;
  }
}
