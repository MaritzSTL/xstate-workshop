import { Machine } from 'xstate/es/index.js';

const carMachine = Machine({
  id: 'gearsPedals',
  // We're going to want to track the state of both the car gear,
  // and the car pedals at the same time. To do this, we'll use a parallel node.
  type: 'parallel',
  states: {
    // What type should the gear be? In what state does it start?
    gear: {},

    // How should the pedals be represented?
    pedals: {},
  },
});

export { carMachine };
