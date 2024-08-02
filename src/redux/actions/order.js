export const setAddOrder = (orderNumber, items) => ({
  type: "SET_ADD_ORDER",
  payload: { orderNumber, items },
});
