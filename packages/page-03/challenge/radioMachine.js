import { Machine, assign } from 'xstate/es/index.js';

const config = Machine(
  {
    id: 'carRadio',
    context: {
      stations: [
        { frequency: '90.7', type: 'FM', name: 'KWMU', favorite: false },
        { frequency: '1120', type: 'AM', name: 'KMOX', favorite: false },
        { frequency: '98.1', type: 'FM', name: 'KYKY', favorite: false },
        { frequency: '103.3', type: 'FM', name: 'KLOU', favorite: false },
        { frequency: '107.7', type: 'FM', name: 'KSLZ', favorite: false },
        { frequency: '102.5', type: 'FM', name: 'KEZK', favorite: false },
        { frequency: '1380', type: 'AM', name: 'KXFN', favorite: false },
        { frequency: '920', type: 'AM', name: 'WGNU', favorite: false },
      ],
      currentStation: null,
    },
    type: 'parallel',
    states: {
      power: {
        initial: 'inactive',
        states: {
          active: {
            entry: [assign(ctx => ({ currentStation: ctx.currentStation || ctx.stations[0] }))],
            on: {
              POWER: 'inactive',
              CHANGE_STATION: {
                actions: ['setStation'],
              },
              FAVORITE: {
                actions: ['setFavorite'],
              },
              UNFAVORITE: {
                actions: ['unsetFavorite'],
              },
            },
          },
          inactive: {
            on: {
              POWER: 'active',
            },
          },
        },
      },
      filter: {
        initial: 'all',
        states: {
          all: {
            on: {
              TOGGLE_FILTER: 'favorites',
            },
          },
          favorites: {
            on: {
              TOGGLE_FILTER: 'all',
            },
          },
        },
      },
      modulationType: {
        initial: 'FM',
        states: {
          FM: {
            on: {
              TOGGLE_MODULATION: 'AM',
            },
          },
          AM: {
            on: {
              TOGGLE_MODULATION: 'FM',
            },
          },
        },
      },
    },
  },
  {
    actions: {
      setFrequency: assign((_ctx, e) => ({ currentFrequency: e.station.frequency })),
      setFavorite: assign({
        stations: (ctx, e) =>
          ctx.stations.map(station =>
            station.frequency === e.station.frequency ? { ...station, favorite: true } : station,
          ),
      }),
      unsetFavorite: assign({
        stations: (ctx, e) =>
          ctx.stations.map(station =>
            station.frequency === e.station.frequency ? { ...station, favorite: false } : station,
          ),
      }),
      setStation: assign((_ctx, e) => ({ currentStation: e.station })),
    },
  },
);

export { config };
