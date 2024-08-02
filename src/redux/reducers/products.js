const initialState = {
  items: [],
};

const products = (state = initialState, action) => {
  if (action.type === "SET_ADD_PRODUCTS") {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};

export default products;
