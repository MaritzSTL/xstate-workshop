import { Machine } from 'xstate';

const carMachine = new Machine({
  id: 'gearsPedals',
  type: 'parallel',
  states: {
    pedals: {},
    gear: {
      states: {
        park: {
          on: {
            UPSHIFT: 'reverse',
          },
        },
        reverse: {
          on: {
            UPSHIFT: 'neutral',
            DOWNSHIFT: 'park',
          },
        },
        neutral: {
          on: {
            UPSHIFT: 'drive1',
            DOWNSHIFT: 'reverse',
          },
        },
        drive1: {
          on: {
            UPSHIFT: 'drive2',
            DOWNSHIFT: 'neutral',
          },
        },
        drive2: {
          on: {
            DOWNSHIFT: 'drive1',
          },
        },
      },
    },
  },
});

export { carMachine };
