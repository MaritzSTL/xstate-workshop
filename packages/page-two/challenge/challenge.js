import { Machine, assign } from 'xstate';

const commonEvents = {
  DEPOSIT: {
    target: 'transacting',
    actions: 'deposit',
  },
  PANIC: {
    actions: 'panic',
  },
};

const account = Machine(
  {
    id: 'account',
    initial: 'goodStanding',
    states: {
      goodStanding: {
        on: {
          ...commonEvents,
          WITHDRAW: {
            target: 'transacting',
            actions: 'withdraw',
          },
        },
      },
      transacting: {
        on: {
          '': [{ target: 'overdrawn', cond: 'balanceIsNegative' }, { target: 'goodStanding' }],
        },
      },
      overdrawn: {
        on: {
          ...commonEvents,
        },
      },
    },
  },
  {
    actions: {
      deposit: assign((context, event) => ({
        balance: context.balance + event.amount,
      })),
      withdraw: assign((context, event) => ({
        balance: context.balance - event.amount,
      })),
      panic: assign(() => ({
        sentiment: 'PANICKING!!!!',
      })),
    },
    guards: {
      balanceIsNegative: context => context.balance < 0,
    },
  },
  {
    balance: 0,
    sentiment: 'not panicking',
  },
);

export { account };
