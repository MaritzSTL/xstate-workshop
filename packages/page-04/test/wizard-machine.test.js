import { expect } from '@open-wc/testing';
import { interpret } from 'xstate/es/index.js';
import { wizardMachine } from '../src/wizardMachine.js';

describe('wizardMachine', () => {
  it('will pass', () => {
    expect(true).to.equal(true);
  });

  /**
   * Testing the Machine
   */
  it('state will initially be set to welcome', () => {
    const service = interpret(wizardMachine).onTransition(initialState => {
      expect(initialState.value).to.equal('welcome');
    });

    service.start();
  });

  /**
   * You can invoke it as a service, like you'd use in a component
   */
  it('NEXT will transition to the question state (service)', () => {
    let state;
    const service = interpret(wizardMachine).onTransition(s => {
      state = s;
    });
    service.start();

    service.send('NEXT');

    expect(state.value).to.equal('question');
  });

  /**
   * Or you can invoke statelessly via `transition`
   */
  it('NEXT will transition to the question state (transition)', () => {
    const next = wizardMachine.transition(wizardMachine.initialState, 'NEXT');
    expect(next.value).to.equal('question');
  });

  /**
   * Testing an action inside a machine
   */

  it('toggleTocAccepted will toggle tocAccepted (live machine)', () => {
    let state;
    const service = interpret(wizardMachine).onTransition(s => {
      state = s;
    });
    service.start();

    service.send('NEXT'); // welcome -> question
    service.send('NEXT'); // question -> toc
    service.send('TOGGLE'); // this event triggers action

    expect(state.context.tocAccepted).to.equal(true);
  });

  /**
   * Testing an action directly via reference
   */
  it('toggleTocAccepted will toggle tocAccepted (direct test)', () => {
    const service = interpret(wizardMachine);
    const context = {
      tocAccepted: false,
    };
    const event = {
      type: 'TOGGLE',
    };
    expect(service.machine.options.actions.toggleTocAccepted.assignment(context, event)).to.eql({
      tocAccepted: true,
    });
  });
});
