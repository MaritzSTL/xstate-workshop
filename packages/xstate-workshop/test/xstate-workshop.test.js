import { html, fixture, expect } from '@open-wc/testing';

import '../xstate-workshop.js';

describe('XstateWorkshop', () => {
  it('has page "main" by default', async () => {
    const el = await fixture(html`
      <xstate-workshop></xstate-workshop>
    `);

    expect(el.page).to.equal('main');
    expect(el.shadowRoot.querySelector('main')).lightDom.to.equal(`
      <page-main></page-main>
    `);
  });
});
