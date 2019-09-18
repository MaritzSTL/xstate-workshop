import { Machine } from 'xstate';

const carMachine = Machine({
  id: 'gearsPedals',
  type: 'parallel',
  states: {
    gear: {
      type: 'compound',
      initial: 'park',
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
    pedals: {
      type: 'parallel',
      states: {
        gas: {
          initial: 'unpressed',
          type: 'compound',
          states: {
            unpressed: {
              on: {
                PRESS_GAS: 'pressed',
              },
            },
            pressed: {
              on: {
                RELEASE_GAS: 'unpressed',
              },
            },
          },
        },
        brake: {
          initial: 'unpressed',
          type: 'compound',
          states: {
            unpressed: {
              on: {
                PRESS_BRAKE: 'pressed',
              },
            },
            pressed: {
              on: {
                RELEASE_BRAKE: 'unpressed',
              },
            },
          },
        },
      },
    },
  },
});

export { carMachine };
