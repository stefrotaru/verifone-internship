import React, { useState, useEffect, useReducer } from "react";

import "tachyons";
import Products from "./Components/Products";
import ShoppingCart from "./Components/ShoppingCart";
import StoreContext, { store as initialStore } from "./Context/Store";
import storeReducer from "./Reducers/storeReducer";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  useEffect(() => {
    fetch("http://private-32dcc-products72.apiary-mock.com/product")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          dispatch({
            type: "LOAD_PRODUCTS",
            items: [
              // ...result,
              {
                id: 100,
                name: "test1",
                price: 100,
              },
              {
                id: 101,
                name: "test2",
                price: 25,
              },
              {
                id: 102,
                name: "test",
                price: 50,
              }
            ],
          });
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const updateAvailableCurrencies = (currArr) => {
    dispatch({ type: "SET_AVAILABLE_CURRENCIES", data: currArr });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <StoreContext.Provider value={{ store, dispatch }}>
        <div className="centered-div">
          <div className="header-div">
            <h1>Checkout page</h1>
          </div>
          <div className="body-div">
            <Products />
            <ShoppingCart />
          </div>
        </div>
      </StoreContext.Provider>
    );
  }
};

export default App;

// return (
//   <div>
//     <h1>Checkout page</h1>
//     <Products />
//     <ShoppingCart />
//   </div>
// );
