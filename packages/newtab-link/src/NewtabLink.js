import { LitElement, svg, html, css } from 'lit-element';

const outlinkIcon = svg`
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
`;

export class NewtabLink extends LitElement {
  static get properties() {
    return {
      href: { type: String },
    };
  }

  render() {
    return html`
      <a href="${this.href}" target="_blank" rel="noopener noreferrer">
        <slot></slot>
        ${outlinkIcon}
      </a>
    `;
  }

  static get styles() {
    return [
      css`
        a {
          text-decoration: none;
          color: #aaa;
        }
        a:visited {
          color: #aaa;
          text-decoration: none;
        }
        a:hover {
          color: blue;
          text-decoration: none;
        }
      `,
    ];
  }
}
