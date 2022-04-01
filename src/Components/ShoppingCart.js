import React, { useContext } from "react";

import MoneyConverse from "./MoneyConverse";
import CartItem from "./CartItem";
import StoreContext from "../Context/Store";
import roundToDecimals from "../Utils/roundToDecimals";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const ShoppingCart = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { total, cartItems, currencyData } = store;

  const { ratio } = currencyData;

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "UPDATE_TOTAL" });
  };

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-inside">
        {cartItems.length < 1 && <h3>No products in your shopping cart</h3>}
        {cartItems.length > 0 && <h3>Products in your shopping cart</h3>}
        {cartItems.length > 0 && (
          <table className="table-cart">
            <thead>
              <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Value</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((ci, i) => {
                return <CartItem item={ci} key={i} index={i} />;
              })}
            </tbody>
          </table>
        )}
        {cartItems.length > 0 && <hr className="shopping-cart-total-hr"></hr>}
        {cartItems.length > 0 && (
          <p>
            Total: {roundToDecimals(total * ratio)} {currencyData.shortSymbol}
          </p>
        )}
        <MoneyConverse />
        {cartItems.length > 1 && (
          <Button variant="danger" onClick={clearCartHandler}>
            Clear Cart
          </Button>
        )}
        {cartItems.length > 0 && (
          <div className="d-grid gap-2">
            <Button variant="success" size="lg">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
