import React from "react";

const store = {
  items: [],
  cartItems: [],
  total: 0,
  currencyData: {
    ratio: 1,
    label: "USD",
    shortSymbol: "$",
  },
  currencyValue: 0,
  availableCurrencies: [{ ratio: 1, label: "USD", shortSymbol: "$", createdAt: new Date().getTime()}],
};


const StoreContext = React.createContext(store);

export { store, StoreContext as default };
