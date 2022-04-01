import React, { useState, useEffect, useReducer } from "react";

import { PRODUCTS_API } from "./AppConfig";
import Products from "./Components/Products";
import ShoppingCart from "./Components/ShoppingCart";
import StoreContext, { store as initialStore } from "./Context/Store";
import storeReducer from "./Reducers/storeReducer";

const testProducts = [
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
  },
];

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  const loadProducts = (prodArr) => {
    dispatch({
      type: "LOAD_PRODUCTS",
      items: [...prodArr],
    });
  };

  useEffect(() => {
    fetch(PRODUCTS_API)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          loadProducts([...result])  //  , ...testProducts
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          loadProducts(testProducts);
        }
      );
  }, []);

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
            <hr className="checkout-page-hr"></hr>
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