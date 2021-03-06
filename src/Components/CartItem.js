import React, { useContext } from "react";

import StoreContext from "../Context/Store";
import roundToDecimals from "../Utils/roundToDecimals";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const CartItem = ({ item, index }) => {
  const { store, dispatch } = useContext(StoreContext);
  const { ratio } = store.currencyData;

  let quantityNo = store.cartItems.find((prod) => item.id === prod.id).quantity;

  const removeFromCartHandler = () => {
    dispatch({ type: "REMOVE_FROM_CART", id: index });
    dispatch({ type: "UPDATE_TOTAL" });
  };

  const onChangeHandler = (e) => {
    dispatch({
      type: "UPDATE_QUANTITIES",
      id: item.id,
      quantity: +e.target.value,
    });
    dispatch({ type: "UPDATE_TOTAL" });
  };

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <input
          className="quantity-no"
          type="number"
          value={quantityNo}
          onChange={onChangeHandler}
        />
      </td>
      <td>
        {roundToDecimals(item.price * quantityNo * ratio)}{" "}
        {store.currencyData.shortSymbol}
      </td>
      <td>
        <Button variant="danger" onClick={removeFromCartHandler}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
