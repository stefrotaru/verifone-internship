const roundToDecimals = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

//  const newCartItems = state.cartItems.splice(foundItemIndex, 1, {...cartItem, quantity: cartItem.quantity + 1})

const storeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const foundItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.id
      );

      if (foundItemIndex !== -1) {
        return {
          ...state,
          cartItems: state.cartItems.map((ci, i) =>
            i === foundItemIndex
              ? { ...ci, quantity: ci.quantity + 1 }
              : { ...ci }
          ),
        };
      } else {
        const newProduct = state.items.find((item) => item.id === action.id);
        return {
          ...state,
          cartItems: [...state.cartItems, { ...newProduct, quantity: 1 }],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter((item, i) => i !== action.id),
      };
    }
    case "CLEAR_CART": {
      return { ...state, cartItems: [] };
    }
    case "LOAD_PRODUCTS": {
      return { ...state, items: action.items };
    }
    case "UPDATE_TOTAL": {
      return {
        ...state,
        total: state.cartItems.reduce((acc, item) => {
          return roundToDecimals(item.price * item.quantity + acc);
        }, 0),
      };
    }
    case "CHANGE_CURRENCY_VALUE": {
      return { ...state, currencyValue: action.value };
    }
    case "UPDATE_CURRENCY_DATA": {
      return { ...state, currencyData: action.data };
    }
    case "SET_AVAILABLE_CURRENCIES": {
      return { ...state, availableCurrencies: action.data };
    }
    case "UPDATE_QUANTITIES": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.id) {
            item.quantity = action.quantity;
          }
          return item;
        }),
      };
    }
    default:
      return { ...state };
  }
};

export default storeReducer;
