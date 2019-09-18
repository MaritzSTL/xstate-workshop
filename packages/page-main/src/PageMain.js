import { html, css, LitElement } from 'lit-element';
import '../../newtab-link/newtab-link.js';

export class PageMain extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      title: { type: String },
      logo: { type: Function },
    };
  }

  constructor() {
    super();
    this.title = 'XState Workshop Overview';
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <p>
        <newtab-link href="https://statecharts.github.io/">StateCharts</newtab-link> |
        <newtab-link href="https://xstate.js.org/">XState</newtab-link> |
        <newtab-link href="https://github.com/MaritzSTL/xstate-workshop/">Sauce</newtab-link>
      </p>
      <ol>
        <li>Thinking in XState</li>
        <li>Where do I put state?</li>
        <li>How do I wire up with lit?</li>
        <li>Testing</li>
        <li>Thinking in Terms of Actors</li>
      </ol>
    `;
  }
}
