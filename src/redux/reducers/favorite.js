const initialState = {
  items: [],
};

const favorite = (state = initialState, action) => {
  if (action.type === "SET_ADD_FAVORITE") {
    return {
      ...state,
      items: action.payload,
    };
  }
  if (action.type === "SET_DEL_FAVORITE") {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};

export default favorite;
