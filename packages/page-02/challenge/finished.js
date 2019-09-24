import { Machine, assign } from 'xstate/es/index.js';

const carMachine = Machine(
  {
    id: 'carSpeed',
    context: {
      speed: 0,
      gas: 10,
    },
    initial: 'stationary',
    states: {
      stationary: {
        on: {
          GAS: {
            target: 'speedChanging',
            actions: ['accelerate', 'consumeGas'],
            cond: 'hasGasRemaining',
          },
        },
      },
      speedChanging: {
        on: {
          '': [
            {
              target: 'stationary',
              cond: 'isStationary',
            },
            {
              target: 'moving',
              cond: 'isMoving',
            },
          ],
        },
      },
      moving: {
        on: {
          GAS: {
            target: 'speedChanging',
            actions: ['accelerate', 'consumeGas'],
            cond: 'hasGasRemaining',
          },
          BRAKE: {
            target: 'speedChanging',
            actions: ['decelerate'],
          },
          COAST: {
            target: 'speedChanging',
            actions: ['decelerate'],
          },
        },
      },
    },
  },
  {
    actions: {
      accelerate: assign((ctx, e) => ({ speed: ctx.speed + (e.amount || 1) })),
      decelerate: assign((ctx, e) => ({ speed: Math.max(ctx.speed - (e.amount || 2), 0) })),
      consumeGas: assign(ctx => ({ gas: Math.max(ctx.gas - 1, 0) })),
    },
    guards: {
      hasGasRemaining: ctx => ctx.gas > 0,
      isStationary: ctx => ctx.speed === 0,
      isMoving: ctx => ctx.speed > 0,
    },
  },
);

export { carMachine };
