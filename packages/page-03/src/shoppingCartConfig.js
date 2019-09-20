import { Machine, assign } from 'xstate/es/index.js';

const initialContext = {
  items: [],
  totalCost: 0,
  creditCard: '',
};

export const config = Machine(
  {
    id: 'shoppingCart',
    initial: 'shopping',
    states: {
      shopping: {
        on: {
          ADD_ITEM: {
            actions: ['addItem', 'updateTotalCost'],
          },
          UPDATE_QUANTITY: {
            actions: ['updateQuantity', 'updateTotalCost'],
          },
          REMOVE_ITEM: {
            actions: [
              assign({
                items: (ctx, e) => ctx.items.filter(item => item.name !== e.payload.item.name),
              }),
              'updateTotalCost',
            ],
          },
          PAY_NOW: {
            target: 'checkout',
            cond: 'cartHasItems',
          },
        },
      },
      checkout: {
        on: {
          CANCEL: {
            target: 'shopping',
          },
          UPDATE_CREDIT_CARD: {
            actions: assign((_c, e) => ({ creditCard: e.payload.value })),
          },
          SUBMIT: {
            target: 'confirmation',
            cond: 'hasValidPaymentInfo',
          },
        },
      },
      confirmation: {
        on: {
          CANCEL: {
            target: 'checkout',
          },
          CONFIRM: {
            target: 'success',
          },
        },
      },
      success: {
        after: {
          3000: { target: 'shopping', actions: ['resetCart'] },
        },
      },
    },
  },
  {
    actions: {
      addItem: assign((context, event) => ({
        items: [...context.items, { ...event.payload.item, quantity: 1 }],
      })),
      updateTotalCost: assign(context => ({
        totalCost: context.items
          .map(item => item.price * item.quantity)
          .reduce((total, lineItemCost) => total + lineItemCost, 0),
      })),
      updateQuantity: assign((context, event) => {
        // All the logic here is a good indication we're doing too much,
        // and would benefit from breaking the domain concepts apart.
        const itemIndex = context.items.indexOf(event.payload.item);
        const newItem = { ...context.items[itemIndex] };

        const updatedQuantity = newItem.quantity + event.payload.changeAmount;

        newItem.quantity = updatedQuantity < 1 ? 1 : updatedQuantity;

        const newItems = [...context.items];
        newItems[itemIndex] = newItem;

        return {
          ...context,
          items: newItems,
        };
      }),
      resetCart: assign(() => initialContext),
    },
    guards: {
      cartHasItems: context => !!context.items.length,
      hasValidPaymentInfo: context => context.creditCard.length,
    },
  },
  initialContext,
);
