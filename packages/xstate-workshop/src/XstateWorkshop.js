import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import '../../page-main/page-main.js';
import '../../page-01/page-01.js';
import '../../page-02/page-02.js';
import '../../page-03/page-03.js';
import '../../page-04/page-04.js';
import '../../page-05/page-05.js';

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
      case 'page01':
        return html`
          <page-01></page-01>
        `;
      case 'page02':
        return html`
          <page-02></page-02>
        `;
      case 'page03':
        return html`
          <page-03></page-03>
        `;
      case 'page04':
        return html`
          <page-04></page-04>
        `;
      case 'page05':
        return html`
          <page-05></page-05>
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
                >Intro</a
              >
            </li>
            <li>
              <a href="#page01" class=${this.__addActiveIf('page01')} @click=${this.__clickPageLink}
                >Thinking in XState</a
              >
            </li>
            <li>
              <a href="#page02" class=${this.__addActiveIf('page02')} @click=${this.__clickPageLink}
                >Placing State</a
              >
            </li>
            <li>
              <a href="#page03" class=${this.__addActiveIf('page03')} @click=${this.__clickPageLink}
                >LitElement Usage</a
              >
            </li>
            <li>
              <a href="#page04" class=${this.__addActiveIf('page04')} @click=${this.__clickPageLink}
                >Testing</a
              >
            </li>
            <li>
              <a href="#page05" class=${this.__addActiveIf('page05')} @click=${this.__clickPageLink}
                >Thinking in Actors</a
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
