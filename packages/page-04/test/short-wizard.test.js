import { html, fixture, expect } from '@open-wc/testing';

import '../src/short-wizard.js';

describe('short-wizard test', () => {
  it('starts welcoming', async () => {
    const el = await fixture(html`
      <short-wizard></short-wizard>
    `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('moves to questioning', async () => {
    const el = await fixture(html`
      <short-wizard></short-wizard>
    `);

    el.shadowRoot.querySelector('chameleon-button').click();
    await el.updateComplete;

    expect(el).shadowDom.to.equalSnapshot();
  });

  /**
   * TODO: testing input into a chameleon input
   */
  xit('captures answer', async () => {
    const el = await fixture(html`
      <short-wizard></short-wizard>
    `);

    el.shadowRoot.querySelector('chameleon-button').click();
    await el.updateComplete;

    el.shadowRoot.querySelector('chameleon-input').value = 'oh boy - do I!!!';
    await el.updateComplete;

    expect(el.answer).to.equal('oh boy - do I!!!');
  });
});
