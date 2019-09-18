import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import '../../page-main/page-main.js';
import '../../page-one/page-one.js';
import '../../page-two/page-two.js';

export class XstateWorkshop extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = 'main';
  }

  _renderPage() {
    switch (this.page) {
      case 'main':
        return html`
          <page-main></page-main>
        `;
      case 'pageOne':
        return html`
          <page-one></page-one>
        `;
      case 'pageTwo':
        return html`
          <page-two></page-two>
        `;
      default:
        return html`
          <p>Page not found try going to <a href="#main">Main</a></p>
        `;
    }
  }

  __clickPageLink(ev) {
    ev.preventDefault();
    this.page = ev.target.hash.substring(1);
  }

  __addActiveIf(page) {
    return classMap({ active: this.page === page });
  }

  render() {
    return html`
      <div id="pagewrapper">
        <header>
          <ul>
            <li>
              <a href="#main" class=${this.__addActiveIf('main')} @click=${this.__clickPageLink}
                >Main</a
              >
            </li>
            <li>
              <a
                href="#pageOne"
                class=${this.__addActiveIf('pageOne')}
                @click=${this.__clickPageLink}
                >Intro</a
              >
            </li>
            <li>
              <a
                href="#pageTwo"
                class=${this.__addActiveIf('pageTwo')}
                @click=${this.__clickPageLink}
                >Placing State</a
              >
            </li>
          </ul>
        </header>

        <main>
          ${this._renderPage()}
        </main>
        <div></div>
      </div>
    `;
  }

  static get styles() {
    return [
      css`
        #pagewrapper {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
        }
      `,
    ];
  }
}
