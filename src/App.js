import React, { useState, useEffect, useReducer } from "react";

import { PRODUCTS_API } from "./AppConfig";
import Products from "./Components/Products";
import ShoppingCart from "./Components/ShoppingCart";
import StoreContext, { store as initialStore } from "./Context/Store";
import storeReducer from "./Reducers/storeReducer";

import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";

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
          loadProducts([...result]); //  , ...testProducts
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
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      >
        <StoreContext.Provider value={{ store, dispatch }}>
          <div className="centered-div">
            <div className="header-div">
              <h1>Checkout page</h1>
              <hr className="checkout-page-hr"></hr>
            </div>
            <div class="container" className="body-div">
              <div class="row row-cols-auto">
                <div class="col">
                  <Products />
                </div>
                <div class="col">
                  <ShoppingCart />
                </div>
              </div>
            </div>
          </div>
        </StoreContext.Provider>
      </ThemeProvider>
    );
  }
};

export default App;
