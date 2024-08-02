const initialState = {
  items: [],
};

const basket = (state = initialState, action) => {
  if (action.type === "SET_ADD_BASKET") {
    return {
      ...state,
      items: action.payload,
    };
  }
  if (action.type === "SET_DEL_BASKET") {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};

export default basket;
