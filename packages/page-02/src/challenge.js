import { Machine, assign } from 'xstate';

const machine = Machine(
  {
    id: 'multiply',
    context: { count: 1, value: 4 },
    initial: 'addThenMultiply',
    states: {
      addThenMultiply: {
        on: {
          TOGGLE: 'multiplyThenAdd',
          INCREMENT: {
            actions: ['multiply', 'add'],
          },
        },
      },
      multiplyThenAdd: {
        on: {
          TOGGLE: 'addThenMultiply',
          INCREMENT: {
            actions: ['add', 'multiply'],
          },
        },
      },
    },
    on: {
      RESET: {
        actions: 'reset',
      },
      CHANGE_VALUE: {
        actions: 'setValue',
      },
    },
  },
  {
    actions: {
      add: assign({ count: context => context.count + context.value }),
      multiply: assign({ count: context => context.count * context.value }),
      reset: assign({ count: 1, value: 4 }),
      setValue: assign({ value: (_context, event) => event.value }),
    },
  },
);

export { machine };
