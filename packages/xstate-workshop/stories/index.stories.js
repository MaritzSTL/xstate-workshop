import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { XstateWorkshop } from '../src/XstateWorkshop.js';
import '../xstate-workshop.js';

storiesOf('xstate-workshop', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(XstateWorkshop))
  .add(
    'Alternative Title',
    () => html`
      <xstate-workshop .title=${'Something else'}></xstate-workshop>
    `,
  );
