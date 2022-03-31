import React from "react";
import { useContext } from "react";
import StoreContext from "../Context/Store";
import roundToDecimals from "../Utils/roundToDecimals";

import "tachyons";

const ProductCard = ({ product }) => {
  const {store, dispatch} = useContext(StoreContext);
  const {ratio} = store.currencyData;

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(product.quantity)
    dispatch({type: "ADD_TO_CART", id: product.id});
    dispatch({type: "UPDATE_TOTAL"});
  };

  return (
    <div className="product-card shadow-1">

      <h2>{product.name}</h2>
      <div className="flex">
        <span className="product-card-price">Price: {roundToDecimals(product.price * ratio)} {store.currencyData.shortSymbol}</span>
      </div>
      <button className="f6 link dim br3 ph3 pv2 mb dib white bg-dark-green" onClick={clickHandler}>Add to cart</button>

    </div>
  );
};

export default ProductCard;
