import { Machine, assign } from 'xstate/es/index.js';

export const wizardMachine = Machine(
  {
    id: 'wizardMachine',
    context: {
      answer: '',
      tocAccepted: false,
    },
    initial: 'welcome',
    states: {
      welcome: {
        on: {
          NEXT: 'question',
        },
      },
      question: {
        on: {
          INPUT: {
            actions: assign((context, event) => ({ answer: event.payload.value })),
          },
          NEXT: 'toc',
          BACK: 'welcome',
        },
      },
      toc: {
        on: {
          NEXT: 'success',
          BACK: 'question',
          TOGGLE: {
            actions: ['toggleTocAccepted'],
          },
        },
      },
      success: {
        on: {
          BACK: 'toc',
        },
      },
    },
  },
  {
    actions: {
      toggleTocAccepted: assign(context => ({ tocAccepted: !context.tocAccepted })),
    },
  },
);
