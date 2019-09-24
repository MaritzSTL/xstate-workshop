// eslint-disable-next-line no-unused-vars
import { Machine, assign } from 'xstate/es/index.js';

const carMachine = Machine(
  {
    id: 'carSpeed',
    context: {},
    initial: 'stationary',
    states: {
      stationary: {
        on: {
          GAS: {},
        },
      },
      speedChanging: {
        on: {
          '': [],
        },
      },
      moving: {
        on: {
          GAS: {},
          BRAKE: {},
          COAST: {},
        },
      },
    },
  },
  {
    actions: {},
    guards: {},
  },
);

export { carMachine };
