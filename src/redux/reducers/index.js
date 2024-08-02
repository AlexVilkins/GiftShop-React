import { combineReducers } from "redux";

import basket from "./basket";
import favorite from "./favorite";
import order from "./order";
import products from "./products";

const rootReducer = combineReducers({
  basket,
  favorite,
  order,
  products,
});

export default rootReducer;
