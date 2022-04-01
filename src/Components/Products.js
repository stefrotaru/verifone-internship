import React, { useContext } from "react";
import StoreContext from "../Context/Store";
import ProductCard from "./ProductCard";

const Products = () => {
  const { store } = useContext(StoreContext);

  return (
    <div >
      {store.items.length > 0 && store.items
          .sort((itemA, itemB) => itemA.price - itemB.price)
          .map((item, i) => {
            return <ProductCard key={i} product={item} />;
          })}
    </div>
  );
};

export default Products;
