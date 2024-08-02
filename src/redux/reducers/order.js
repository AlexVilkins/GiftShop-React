const initialState = [];

const order = (state = initialState, action) => {
  if (action.type === "SET_ADD_ORDER") {
    console.log("action", action.payload);
    return [
      ...state,
      {
        orderNumber: action.payload.orderNumber,
        objs: action.payload.items,
      },
    ];
  }
  return state;
};

export default order;
