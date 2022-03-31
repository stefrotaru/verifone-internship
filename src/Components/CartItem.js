import React, { useContext } from "react";
import StoreContext from "../Context/Store";
import roundToDecimals from "../Utils/roundToDecimals";

const CartItem = ({ item, index }) => {
  const { store, dispatch } = useContext(StoreContext);

  let quantityNo = store.cartItems.find( prod => item.id === prod.id ).quantity;

  const removeFromCartHandler = () => {
    dispatch({ type: "REMOVE_FROM_CART", id: index });
    dispatch({ type: "UPDATE_TOTAL" });
  };

  const onChangeHandler = (e) => {
    dispatch({type: "UPDATE_QUANTITIES", id: item.id, quantity: +e.target.value});
    dispatch({type: "UPDATE_TOTAL"});
  };

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <input className="quantity-no" type="number" value={quantityNo} onChange={onChangeHandler} />
      </td>
      <td>{roundToDecimals(item.price * quantityNo)}{store.currencyData.shortSymbol}</td>
      <td>
        <button onClick={removeFromCartHandler}>x</button>
      </td>
    </tr>
  );
};

export default CartItem;
