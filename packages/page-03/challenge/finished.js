import { LitElement, html, css } from 'lit-element';
import '@chameleon-ds/button';
import { interpret } from 'xstate';
import { config as radioMachine } from './radioMachine.js';

/**
 * TODO: this isn't finished yet. Need to add filtering, and styling updates.
 */

export class FinishedRadio extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      stations: { type: Array },
      currentStation: { type: Object },
    };
  }

  constructor() {
    super();
    this.service = interpret(radioMachine)
      .onTransition(state => {
        this.state = state;

        const { stations, currentStation } = state.context;
        this.stations = stations;
        this.currentStation = currentStation;
        // eslint-disable-next-line no-console
        console.log(state);
      })
      .start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.service.stop();
  }

  get filteredStations() {
    return this.stations
      .filter(station => station.type === this.state.value.modulationType)
      .filter(station => {
        if (this.state.matches('filter.all')) return true;
        if (this.state.matches('filter.favorites')) return station.favorite;
        return true;
      });
  }

  handlePower() {
    this.service.send('POWER');
  }

  handleNext() {
    const event = {
      type: 'CHANGE_STATION',
      station: this._changedStation(1),
    };
    this.service.send(event);
  }

  handlePrevious() {
    const event = {
      type: 'CHANGE_STATION',
      station: this._changedStation(-1),
    };
    this.service.send(event);
  }

  handleFavorite() {
    const event = {
      type: 'FAVORITE',
      station: this.currentStation,
    };
    this.service.send(event);
  }

  handleUnfavorite() {
    const event = {
      type: 'UNFAVORITE',
      station: this.currentStation,
    };
    this.service.send(event);
  }

  _changedStation(delta) {
    const start = 0;
    const end = this.filteredStations.length - 1;

    const current = this.filteredStations.indexOf(this.currentStation);

    let next = current + delta;
    if (next < 0) next = end;
    if (next > end) next = start;

    return this.filteredStations[next];
  }

  _renderStations() {
    return html`
      ${this.filteredStations.map(
        station => html`
          <span class="station" ?favorite="${station.favorite}"
            >${station.name}/${station.frequency}</span
          >
        `,
      )}
    `;
  }

  _renderControls() {
    return html`
      <chameleon-button @click="${this.handlePower}">Turn Off</chameleon-button>

      <span class="filter" ?active="${this.state.matches('filter.all')}">all</span>
      |
      <span class="filter" ?active="${this.state.matches('filter.favorites')}">favorites</span>

      <br />

      ${this.currentStation.favorite
        ? html`
            <chameleon-button @click="${this.handleUnfavorite}">Unfavorite</chameleon-button>
          `
        : html`
            <chameleon-button @click="${this.handleFavorite}">Favorite</chameleon-button>
          `}

      <br />
      <chameleon-button @click="${this.handleNext}">Next</chameleon-button>
      <chameleon-button @click="${this.handlePrevious}">Previous</chameleon-button>
    `;
  }

  render() {
    const radioHeader = html`
      <h1>Your Radio</h1>
    `;

    if (this.state.matches('power.inactive'))
      return html`
        ${radioHeader}
        <div>
          Powered Off
        </div>

        <div><chameleon-button @click="${this.handlePower}">Turn On</chameleon-button></div>
      `;

    if (this.state.matches('power.active'))
      return html`
        ${radioHeader}

        <div>
          ${this._renderStations()}
        </div>

        <div>Current Station: ${this.currentStation.name} at ${this.currentStation.frequency}</div>
        <div>
          ${this._renderControls()}
        </div>
      `;

    return html`
      ${radioHeader}
      <div>
        Oops! Radio is broken
      </div>
    `;
  }

  static get styles() {
    return [
      css`
        .filter {
          cursor: pointer;
        }
        .filter:hover {
          color: grey;
        }
        .filter[active] {
          font-weight: 800;
        }

        .station[favorite] {
          color: green;
        }
      `,
    ];
  }
}

customElements.define('finished-radio', FinishedRadio);
