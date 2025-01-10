import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./cakeSlice.js";

export const CakeView = () => {
  const noofcakes = useSelector((state) => state.cake.numOfCakes);
  // state here refers to the redux state, which contains multiple reducers, each referred to by the corr. key (here, cake)
  // kind of a wrapper of getState().
  
  const dispatch = useDispatch();

  return (
    <div>
      <h2> Number of Cakes: {noofcakes} </h2>
      <button
        onClick={() => {
          dispatch(ordered(1));
        }}
      >
        Order Cake
      </button>
      <button
        onClick={() => {
          dispatch(ordered(2));
        }}
      >
        Order 2 Cakes
      </button>
      <button
        onClick={() => {
          dispatch(restocked(5));
        }}
      >
        Restock 5 Cakes
      </button>
    </div>
  );
};
