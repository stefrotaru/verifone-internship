import React, { useContext } from "react";
import "tachyons";

import "tachyons";
import MoneyConverse from "./MoneyConverse";
import CartItem from "./CartItem";
import StoreContext from "../Context/Store";
import roundToDecimals from "../Utils/roundToDecimals";

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
        {cartItems && (
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
        <p>
          Total: {roundToDecimals(total * ratio)} {currencyData.shortSymbol}
        </p>
        <MoneyConverse />
        {cartItems.length < 1 && <h3>No products in your shopping cart</h3>}
        {cartItems.length > 0 && (
          <button onClick={clearCartHandler}>Clear Cart</button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
