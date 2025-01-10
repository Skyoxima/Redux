import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { ordered, restocked } from "./iceCreamSlice";
export const IceCreamView = () => {
  const nooficecreams = useSelector((state) => state.iceCream.numOfIceCreams);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  return (
    <div>
      <h2> Number of IceCreams: {nooficecreams} </h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          dispatch(ordered(value));
        }}
      >
        Order {value} IceCream(s)
      </button>
      <button
        onClick={() => {
          dispatch(restocked(10));
        }}
      >
        Re-stock 10 IceCreams
      </button>
    </div>
  );
};
